'use client';

import { experiences } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { MotionDiv } from './motion';

export function ExperienceTimeline() {
  const [open, setOpen] = useState<string[]>(experiences.map((experience) => experience.company));

  const handleClick = (company: string) => {
    setOpen((prev) =>
      prev.includes(company) ? prev.filter((item) => item !== company) : [...prev, company],
    );
  };

  return (
    <div className="relative">
      <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-blue-300/70 via-white/15 to-transparent sm:block" />
      <div className="space-y-4">
        {experiences.map((experience, index) => {
          const expanded = open.includes(experience.company);
          return (
            <MotionDiv
              key={experience.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="relative sm:pl-12"
            >
              <span className="absolute left-2 top-6 hidden size-3 rounded-full border border-blue-200 bg-blue-400 shadow-glow sm:block" />
              <button
                type="button"
                onClick={() => handleClick(experience.company)}
                className="glass focus-ring w-full rounded-lg p-5 text-left transition hover:border-blue-300/35"
                aria-expanded={open.includes(experience.company)}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-200">{experience.period}</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">{experience.role}</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {experience.company} · {experience.location}
                    </p>
                  </div>
                  <ChevronDown size={20} className={`text-neutral-400 transition ${expanded ? 'rotate-180' : ''}`} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.tech.map((tech) => (
                    <span key={tech} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>
                {expanded ? (
                  <ul className="mt-5 space-y-2">
                    {experience.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-2 text-sm leading-6 text-neutral-300">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-300" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </button>
            </MotionDiv>
          );
        })}
      </div>
    </div>
  );
}
