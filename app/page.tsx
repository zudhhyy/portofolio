import { DeferredGameCarousel, DeferredSpinningEarth } from '@/components/home-deferred';
import { MotionDiv, Reveal } from '@/components/motion';
import { Navbar } from '@/components/navbar';
import { AboutSection } from '@/components/sections/about-section';
import { AvailabilitySection } from '@/components/sections/availability-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { profile } from '@/lib/data';
import { openInNewTab } from '@/lib/link';
import { ArrowRight, Download, Mail, Sparkles } from 'lucide-react';
export default function Home() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden pb-20 text-white">
      <DeferredSpinningEarth />
      <Navbar />
      <FloatingStatus />

      <section id="home" className="relative flex min-h-screen items-center px-5 sm:px-8">
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Reveal immediate>
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-300 backdrop-blur">
                <Sparkles size={16} className="text-blue-300" />
                Available for remote and onsite frontend developer roles
              </div>
            </Reveal>
            <Reveal delay={0.08} immediate>
              <h1 className="gradient-text text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                {profile.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.16} immediate>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl">
                5+ years delivering React, Next.js, TypeScript, and React Native products for enterprise applications, startups, and
                teams that care about maintainable architecture and polished user experience.
              </p>
            </Reveal>
            <Reveal delay={0.24} immediate>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/projects"
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
                  href="/contact"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300/40 hover:bg-white/[0.05]"
                >
                  <Mail size={17} />
                  Contact Me
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="hidden lg:block" immediate>
            <DeferredGameCarousel />
          </Reveal>
        </div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AvailabilitySection />
      <ContactSection />
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
      Available for Remote & Onsite Opportunities
    </MotionDiv>
  );
}
