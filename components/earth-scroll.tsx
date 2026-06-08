"use client";

import { useEffect } from "react";

export function EarthScrollRotation() {
  useEffect(() => {
    const img = document.getElementById("earth-lcp");
    if (!img) return;

    const handleScroll = () => {
      img.style.transform = `rotate(${window.scrollY * 0.1}deg)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
