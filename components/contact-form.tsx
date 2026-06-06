"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-lg p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-neutral-300">
          Name
          <input
            required
            className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-blue-300/50"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm font-medium text-neutral-300">
          Email
          <input
            required
            type="email"
            className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-blue-300/50"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-neutral-300">
        Message
        <textarea
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-blue-300/50"
          placeholder="Tell me about the role, product, or project."
        />
      </label>
      <button
        type="submit"
        className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 sm:w-auto"
      >
        <Send size={17} />
        Send Message
      </button>
      {sent ? (
        <p className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
          Thanks. This demo form is ready for an email/API integration.
        </p>
      ) : null}
    </form>
  );
}
