import { PageShell } from '@/components/page-shell';
import { AboutSection } from '@/components/sections/about-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection />
    </PageShell>
  );
}
