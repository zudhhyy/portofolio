import { ProjectExplorer } from '@/components/project-explorer';
import { Section } from '@/components/section';

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Selected systems across SaaS, mobile, commerce, events, and Web3."
      description="Search and filter projects by technology. Public links can be swapped in when client permissions allow."
    >
      <ProjectExplorer />
    </Section>
  );
}
