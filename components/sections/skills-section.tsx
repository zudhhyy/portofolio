import { Reveal } from '@/components/motion';
import { Section } from '@/components/section';
import { skillGroups } from '@/lib/data';

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Technical Skills" title="Built around the modern JavaScript product stack.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <Reveal key={group.title} delay={index * 0.04}>
              <div className="glass group h-full rounded-lg p-5 transition hover:-translate-y-1 hover:border-violet-300/35">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-white/[0.06] text-blue-200">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-neutral-300 transition group-hover:border-blue-300/25"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
