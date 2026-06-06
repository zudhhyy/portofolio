"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import starLottie from "@/lib/lotties/star.json";

export function SpinningEarth() {
  const [rotation, setRotation] = useState(0);
  const [showMeteorMid, setShowMeteorMid] = useState(false);
  const [showMeteorRight, setShowMeteorRight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const midTimer = setTimeout(() => setShowMeteorMid(true), 2000);
    const rightTimer = setTimeout(() => setShowMeteorRight(true), 5000);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(rightTimer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-background-start to-primary-background-end" />

      <Lottie animationData={starLottie} loop className="absolute left-0 top-0 w-1/3 opacity-80" />
      {showMeteorMid ? (
        <Lottie animationData={starLottie} loop className="absolute left-0 right-0 top-10 mx-auto w-1/3 opacity-80" />
      ) : null}
      {showMeteorRight ? (
        <Lottie animationData={starLottie} loop className="absolute bottom-10 right-0 w-1/3 opacity-80" />
      ) : null}

      <div className="fixed -bottom-[35%] left-0 right-0 z-0 mx-auto flex animate-slide-up justify-center lg:-bottom-[80%]">
        <div className="animate-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/background/spinning-earth.webp"
            alt=""
            aria-hidden
            className="w-full max-w-[1000px]"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      </div>
    </div>
  );
}
