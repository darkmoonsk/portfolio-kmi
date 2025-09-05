"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function Background3D() {
  const { themeDark } = useTheme();
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradiente animado de fundo */}
      <motion.div
        className={`absolute inset-0 ${
          themeDark
            ? "bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"
            : "bg-gradient-to-br from-purple-100/20 via-blue-100/20 to-pink-100/20"
        }`}
        animate={{
          background: themeDark
            ? [
                "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))",
                "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))",
                "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1))",
                "linear-gradient(315deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))",
              ]
            : [
                "linear-gradient(45deg, rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))",
                "linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.05))",
                "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05), rgba(147, 51, 234, 0.05))",
                "linear-gradient(315deg, rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))",
              ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Círculos flutuantes 3D */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Grid pattern 3D */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(1000px) rotateX(60deg)",
          }}
        />
      </div>
    </div>
  );
}
