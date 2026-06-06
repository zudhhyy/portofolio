import { PageShell } from '@/components/page-shell';
import { SkillsSection } from '@/components/sections/skills-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
};

export default function SkillsPage() {
  return (
    <PageShell>
      <SkillsSection />
    </PageShell>
  );
}
