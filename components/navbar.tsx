'use client';

import { profile } from '@/lib/data';
import { openInNewTab } from '@/lib/link';
import { Download, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CommandPalette } from './command-palette';

const links = [
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-ink/20 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded-md">
          <Image src="/tdz-logo.png" alt="Tubagus Dhaifullah Zuhdi" width={362} height={306} className="h-9 w-auto sm:h-10" priority />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`focus-ring rounded-md px-3 py-2 text-sm transition ${
                pathname === link.href ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <CommandPalette />
          <a
            href={profile.resume}
            {...openInNewTab}
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-neutral-950 transition hover:bg-blue-100"
          >
            <Download size={16} />
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/[0.06] bg-ink/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm ${pathname === link.href ? 'text-white' : 'text-neutral-300'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <a
                href={profile.resume}
                {...openInNewTab}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-neutral-950"
              >
                <Download size={16} />
                Resume
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
