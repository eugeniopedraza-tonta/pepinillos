"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function AnimateIn({ children, className, delay = 0, id }: AnimateInProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div id={id} className={className}>{children}</div>;
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
