import { PageShell } from '@/components/page-shell';
import { ExperienceSection } from '@/components/sections/experience-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <ExperienceSection />
    </PageShell>
  );
}
