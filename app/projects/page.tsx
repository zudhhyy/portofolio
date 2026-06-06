import { PageShell } from '@/components/page-shell';
import { ProjectsSection } from '@/components/sections/projects-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <ProjectsSection />
    </PageShell>
  );
}
