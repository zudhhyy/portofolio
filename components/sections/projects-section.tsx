import { ProjectExplorer } from '@/components/project-explorer';
import { Section } from '@/components/section';

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="A few things I've built and shipped along the way."
      description="Browse by stack, explore the details, and check out what's live. Some client work stays private. Happy to walk through more on a call."
    >
      <ProjectExplorer />
    </Section>
  );
}
