"use client";
import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  size?: number;
  ringWidth?: number; // px do anel
  speed?: number; // s por volta
};

export default function CirclePower({
  src,
  size = 280,
  ringWidth = 8,
  speed = 3,
}: Props) {
  return (
    <div
      className="cp-wrap"
      style={
        {
          "--cp-size": `${size}px`,
          "--cp-ring": `${ringWidth}px`,
          "--cp-speed": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div className="cp-ring" />
      <Image
        className="cp-img"
        src={src}
        alt="Logo circular"
        width={Math.round(size * 0.72)}
        height={Math.round(size * 0.72)}
        priority
      />
    </div>
  );
}
