"use client";

import React from "react";
import { motion } from "framer-motion";

interface Text3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function Text3D({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}: Text3DProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        rotateX: -90,
        transformOrigin: "bottom",
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transformOrigin: "bottom",
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface GlitchText3DProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchText3D({ children, className = "" }: GlitchText3DProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        textShadow: [
          "0 0 0 transparent",
          "2px 0 0 #ff0000, -2px 0 0 #00ffff",
          "0 0 0 transparent",
        ],
      }}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
    >
      {children}
    </motion.div>
  );
}
