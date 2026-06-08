"use client";

import dynamic from "next/dynamic";
import { EarthLcp } from "@/components/earth-lcp";
import { EarthScrollRotation } from "@/components/earth-scroll";

const StarField = dynamic(() => import("@/components/star-field").then((m) => ({ default: m.StarField })), {
  ssr: false,
});

type SpinningEarthProps = {
  spin?: boolean;
};

export function SpinningEarth({ spin = true }: SpinningEarthProps) {
  return (
    <>
      <EarthLcp>{spin ? <StarField /> : null}</EarthLcp>
      {spin ? <EarthScrollRotation /> : null}
    </>
  );
}
