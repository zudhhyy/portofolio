import { ExperienceTimeline } from '@/components/experience-timeline';
import { Section } from '@/components/section';

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've Worked, What I've Built, and Who I've Collaborated With."
    >
      <ExperienceTimeline />
    </Section>
  );
}
