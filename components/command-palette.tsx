"use client";

import { profile } from "@/lib/data";
import { Command, Download, ExternalLink, Mail, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MotionDiv } from "./motion";
import { openHrefInNewTab } from "@/lib/link";

const actions = [
  { label: "View Projects", hint: "Jump to selected work", href: "#projects", icon: Search },
  { label: "Read Experience", hint: "Open professional timeline", href: "#experience", icon: Command },
  { label: "Contact Me", hint: "Start a hiring conversation", href: "#contact", icon: Mail },
  { label: "Download Resume", hint: "Open PDF resume", href: profile.resume, icon: Download },
  { label: "LinkedIn", hint: "View professional profile", href: profile.linkedin, icon: ExternalLink },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    return actions.filter((action) =>
      `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    } else {
      openHrefInNewTab(href);
      return;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-300 transition hover:border-blue-300/40 hover:text-white sm:inline-flex"
      >
        <Command size={15} />
        <span>Command</span>
        <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[11px] text-neutral-500">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center h-screen bg-black/80 px-4 pt-24 backdrop-blur-sm">
          <button className="absolute inset-0 cursor-default" type="button" aria-label="Close command palette" onClick={() => setOpen(false)} />
          <MotionDiv
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass relative w-full max-w-xl overflow-hidden rounded-lg"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={18} className="text-blue-300" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search actions, sections, links..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
              />
            </div>
            <div className="p-2">
              {filtered.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => go(action.href)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition hover:bg-white/[0.07]"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-md bg-white/[0.06] text-blue-200">
                      <Icon size={17} />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">{action.label}</span>
                      <span className="block text-xs text-neutral-500">{action.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </MotionDiv>
        </div>
      ) : null}
    </>
  );
}
