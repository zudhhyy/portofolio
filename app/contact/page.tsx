import { PageShell } from '@/components/page-shell';
import { ContactSection } from '@/components/sections/contact-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactSection />
    </PageShell>
  );
}
