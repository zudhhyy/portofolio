import { EarthBackground } from '@/components/earth-background';
import { Navbar } from '@/components/navbar';
import type { ReactNode } from 'react';

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden pb-20 text-white">
      <EarthBackground spin={false} />
      <Navbar />
      <div className="pt-16">{children}</div>
    </main>
  );
}
