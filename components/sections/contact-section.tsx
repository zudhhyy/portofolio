import { ContactForm } from '@/components/contact-form';
import { Section } from '@/components/section';
import { contactItems, socialItems } from '@/lib/data';
import { openInNewTab } from '@/lib/link';

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something scalable, elegant, and ready for production."
      description="Reach out for full-time, contract, remote, onsite, or hybrid roles, freelance builds, or product engineering collaboration."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-[18px]">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                data-analytics={`contact-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                {...openInNewTab}
                className="glass flex items-center gap-4 rounded-lg p-4 transition hover:border-blue-300/35"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-white/[0.06] text-blue-200">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block text-sm text-neutral-500">{item.label}</span>
                  <span className="block break-words font-medium text-white">{item.value}</span>
                </span>
              </a>
            );
          })}
        </div>

        <ContactForm />

      </div>
        <div className="glass rounded-lg p-4 w-full mt-6">
          <p className="text-sm text-neutral-500">Social</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  data-analytics={`social-${item.label.toLowerCase()}`}
                  {...openInNewTab}
                  className="focus-ring flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 transition hover:border-blue-300/40 hover:bg-white/[0.06]"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-blue-200">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-neutral-500">{item.label}</span>
                    <span className="block truncate text-sm font-medium text-white">{item.value}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
    </Section>
  );
}
