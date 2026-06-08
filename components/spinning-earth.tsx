"use client";

import dynamic from "next/dynamic";
import { EarthBackground } from "@/components/earth-background";

const StarField = dynamic(() => import("@/components/star-field").then((m) => ({ default: m.StarField })), {
  ssr: false,
});

type SpinningEarthProps = {
  spin?: boolean;
};

export function SpinningEarth({ spin = true }: SpinningEarthProps) {
  return <EarthBackground spin={spin}>{spin ? <StarField /> : null}</EarthBackground>;
}
