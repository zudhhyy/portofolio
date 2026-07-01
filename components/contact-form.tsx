'use client';

import { Loader2, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

async function parseJsonResponse(response: Response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as { success?: boolean; message?: string; error?: string };
  } catch {
    throw new Error('Unexpected response from contact service.');
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('error');
      setError('Contact form is not configured.');
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          botcheck: data.get('botcheck'),
          subject: `Portfolio contact from ${name}`,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await parseJsonResponse(response);

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? 'Failed to send message.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to send message.');
    }
  }

  const isLoading = status === 'loading';

  return (
    <form onSubmit={onSubmit} className="glass rounded-lg p-5 sm:p-6">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-neutral-300">
          Name
          <input
            name="name"
            required
            disabled={isLoading}
            className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-blue-300/50 disabled:opacity-60"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm font-medium text-neutral-300">
          Email
          <input
            name="email"
            required
            type="email"
            disabled={isLoading}
            className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-blue-300/50 disabled:opacity-60"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-neutral-300">
        Message
        <textarea
          name="message"
          required
          rows={5}
          disabled={isLoading}
          className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-blue-300/50 disabled:opacity-60"
          placeholder="Tell me about the role, product, or project."
        />
      </label>
      <button
        type="submit"
        data-analytics="contact-form-submit"
        disabled={isLoading}
        className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isLoading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' ? (
        <p className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
          Message sent. I&apos;ll get back to you soon.
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="mt-4 rounded-md border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
          {error}
        </p>
      ) : null}
    </form>
  );
}
