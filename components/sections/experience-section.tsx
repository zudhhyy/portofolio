import { ExperienceTimeline } from '@/components/experience-timeline';
import { Section } from '@/components/section';

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A timeline of shipped products, architecture decisions, and cross-team collaboration."
    >
      <ExperienceTimeline />
    </Section>
  );
}
