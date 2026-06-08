"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type EarthBackgroundProps = {
  spin?: boolean;
  children?: ReactNode;
};

export function EarthBackground({ spin = true, children }: EarthBackgroundProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!spin) return;

    const handleScroll = () => {
      setRotation(window.scrollY * 0.1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [spin]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-background-start to-primary-background-end" />
      {children}
      <div className="fixed -bottom-[35%] left-0 right-0 z-0 mx-auto flex animate-slide-up justify-center lg:-bottom-[80%]">
        <div className="animate-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/background/spinning-earth.webp"
            alt=""
            aria-hidden
            width={1000}
            height={1000}
            fetchPriority="low"
            className="h-auto w-full max-w-[1000px]"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      </div>
    </div>
  );
}
