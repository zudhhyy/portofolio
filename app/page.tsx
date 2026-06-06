import { BlockBreaker } from '@/components/block-breaker';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { ContactForm } from '@/components/contact-form';
import { MotionDiv, Reveal } from '@/components/motion';
import { Navbar } from '@/components/navbar';
import { ProjectExplorer } from '@/components/project-explorer';
import { Section } from '@/components/section';
import { SpinningEarth } from '@/components/spinning-earth';
import { aboutHighlights, availability, contactItems, profile, skillGroups } from '@/lib/data';
import { openInNewTab } from '@/lib/link';
import { ArrowRight, CheckCircle2, Download, Mail, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen pb-40 overflow-hidden text-white">
      <SpinningEarth />
      <Navbar />
      <FloatingStatus />

      <section id="home" className="relative flex min-h-screen items-center px-5 pt-24 sm:px-8">
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Reveal immediate>
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-300 backdrop-blur">
                <Sparkles size={16} className="text-blue-300" />
                Available for remote frontend and full-stack JavaScript roles
              </div>
            </Reveal>
            <Reveal delay={0.08} immediate>
              <h1 className="gradient-text text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                {profile.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.16} immediate>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl">
                5+ years delivering React, Next.js, TypeScript, and React Native products for enterprise applications, startups, and remote
                teams that care about maintainable architecture and polished user experience.
              </p>
            </Reveal>
            <Reveal delay={0.24} immediate>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  {...openInNewTab}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-blue-100"
                >
                  View Projects
                  <ArrowRight size={17} />
                </a>
                <a
                  href={profile.resume}
                  {...openInNewTab}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-300/40 hover:bg-white/[0.08]"
                >
                  <Download size={17} />
                  Download Resume
                </a>
                <a
                  href="#contact"
                  {...openInNewTab}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300/40 hover:bg-white/[0.05]"
                >
                  <Mail size={17} />
                  Contact Me
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="hidden lg:block" immediate>
            <BlockBreaker />
          </Reveal>
        </div>
      </section>

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

      <Section
        id="projects"
        eyebrow="Featured Projects"
        title="Selected systems across SaaS, mobile, commerce, events, and Web3."
        description="Search and filter projects by technology. Public links can be swapped in when client permissions allow."
      >
        <ProjectExplorer />
      </Section>

      <Section
        id="experience"
        eyebrow="Experience"
        title="A timeline of shipped products, architecture decisions, and remote collaboration."
      >
        <ExperienceTimeline />
      </Section>

      <Section id="availability" eyebrow="Availability" title="Open to high-trust remote collaboration.">
        <div className="glass rounded-lg p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white">Available for Remote Opportunities</h3>
              <p className="mt-3 max-w-2xl leading-7 text-neutral-400">
                Interested in frontend leadership, full-stack JavaScript delivery, React Native product work, and contract engagements with
                teams that value clarity, quality, and momentum.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {availability.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-100"
                >
                  <CheckCircle2 size={16} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Let’s build something scalable, elegant, and ready for production."
        description="Reach out for remote roles, freelance builds, technical leadership, or product engineering collaboration."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...openInNewTab}
                  className="glass flex items-center gap-4 rounded-lg p-4 transition hover:border-blue-300/35"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-white/[0.06] text-blue-200">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-sm text-neutral-500">{item.label}</span>
                    <span className="block break-words font-medium text-white">{item.value}</span>
                  </span>
                </a>
              );
            })}
          </div>

          <ContactForm />
        </div>
      </Section>
    </main>
  );
}

function FloatingStatus() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="fixed bottom-4 right-10 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-md border border-emerald-300/20 bg-neutral-950/80 px-4 py-2 text-sm text-emerald-100 shadow-card backdrop-blur-xl sm:flex"
    >
      <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
      Available for Remote Opportunities
    </MotionDiv>
  );
}
