import { Reveal } from '@/components/motion';
import { Section } from '@/components/section';
import { aboutHighlights, profile } from '@/lib/data';

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A senior frontend engineer with product sense and production discipline."
      description={profile.summary}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {aboutHighlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="glass h-full rounded-lg p-6 transition hover:-translate-y-1 hover:border-blue-300/35">
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-blue-400/10 text-blue-200">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-neutral-400">{item.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
