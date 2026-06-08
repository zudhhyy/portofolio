"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import starLottie from "@/lib/lotties/star.json";

export function StarField() {
  const [showMeteorMid, setShowMeteorMid] = useState(false);
  const [showMeteorRight, setShowMeteorRight] = useState(false);

  useEffect(() => {
    const midTimer = setTimeout(() => setShowMeteorMid(true), 2000);
    const rightTimer = setTimeout(() => setShowMeteorRight(true), 5000);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(rightTimer);
    };
  }, []);

  return (
    <>
      <Lottie animationData={starLottie} loop className="absolute left-0 top-0 w-1/3 opacity-80" />
      {showMeteorMid ? (
        <Lottie animationData={starLottie} loop className="absolute left-0 right-0 top-10 mx-auto w-1/3 opacity-80" />
      ) : null}
      {showMeteorRight ? (
        <Lottie animationData={starLottie} loop className="absolute bottom-10 right-0 w-1/3 opacity-80" />
      ) : null}
    </>
  );
}
