"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Heart, Zap } from "lucide-react";

interface FloatingElement {
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
  duration: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const floatingElements: FloatingElement[] = [
  {
    icon: Sparkles,
    delay: 0,
    duration: 4,
    x: 10,
    y: 20,
    size: 20,
    color: "text-yellow-400",
  },
  {
    icon: Star,
    delay: 1,
    duration: 5,
    x: 80,
    y: 10,
    size: 16,
    color: "text-blue-400",
  },
  {
    icon: Heart,
    delay: 2,
    duration: 6,
    x: 20,
    y: 80,
    size: 18,
    color: "text-pink-400",
  },
  {
    icon: Zap,
    delay: 3,
    duration: 4.5,
    x: 90,
    y: 70,
    size: 14,
    color: "text-purple-400",
  },
  {
    icon: Sparkles,
    delay: 1.5,
    duration: 5.5,
    x: 50,
    y: 30,
    size: 12,
    color: "text-green-400",
  },
];

export function FloatingElements3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-60`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className={`size-${element.size}`} />
          </motion.div>
        );
      })}
    </div>
  );
}
