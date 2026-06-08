"use client";

import dynamic from "next/dynamic";

export const DeferredCursorTrail = dynamic(
  () => import("@/components/cursor-trail").then((m) => ({ default: m.CursorTrail })),
  { ssr: false },
);
