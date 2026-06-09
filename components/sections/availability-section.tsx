import { Section } from '@/components/section';
import { availability } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';

export function AvailabilitySection() {
  return (
    <Section id="availability" eyebrow="Availability" title="Open to remote and onsite collaboration.">
      <div className="glass rounded-lg p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">Available for Remote & Onsite Opportunities</h3>
            <p className="mt-3 max-w-2xl leading-7 text-neutral-400">
              Interested in frontend development, React Native product work, and contract engagements, whether your team is
              distributed, hybrid, or in office.
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
  );
}
