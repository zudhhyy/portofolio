import type { ReactNode } from "react";

type EarthLcpProps = {
  children?: ReactNode;
};

export function EarthLcp({ children }: EarthLcpProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-background-start to-primary-background-end" />
      {children}
      <div className="fixed -bottom-[35%] left-0 right-0 z-0 mx-auto flex animate-slide-up justify-center lg:-bottom-[80%]">
        <div className="animate-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="earth-lcp"
            src="/background/spinning-earth.webp"
            srcSet="/background/spinning-earth-640.webp 640w, /background/spinning-earth.webp 1000w"
            sizes="(max-width: 1024px) 100vw, 1000px"
            alt=""
            aria-hidden
            width={1000}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="h-auto w-full max-w-[1000px]"
          />
        </div>
      </div>
    </div>
  );
}
