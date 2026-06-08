"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
};

export function Reveal({ children, delay = 0, className, immediate = false }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={immediate || reduceMotion ? false : { opacity: 0, y: 26 }}
      animate={immediate && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={!immediate && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={!immediate ? { once: true, margin: "-80px" } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const MotionDiv = motion.div;
export const MotionButton = motion.button;
