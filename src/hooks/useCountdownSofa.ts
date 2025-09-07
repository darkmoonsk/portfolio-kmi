"use client";
import { useEffect, useMemo, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number; // por si lo necesitas
  totalMs: number;
  targetDate: Date;
  expired: boolean;
};

/**
 * useCountdownBogota() – cuenta regresiva hacia el 9/oct 00:00 (Bogotá, UTC-05)
 * - Si la fecha de este año ya pasó, salta automáticamente al 9/oct del próximo año.
 */
export function useCountdownSofa(): Countdown {
  // calcula el target (9/oct 00:00, UTC-05) para este año o el siguiente
  const targetDate = useMemo(() => {
    const now = new Date();
    const y = now.getUTCFullYear();
    const mk = (year: number) => new Date(`${year}-10-09T00:00:00-05:00`);
    const t = mk(y);
    return t.getTime() <= now.getTime() ? mk(y + 1) : t;
  }, []);

  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, targetDate.getTime() - nowMs);
  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const minuteMs = 60 * 1000;

  const days = Math.floor(diff / dayMs);
  const hours = Math.floor((diff % dayMs) / hourMs);
  const minutes = Math.floor((diff % hourMs) / minuteMs);
  const seconds = Math.floor((diff % minuteMs) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: diff,
    targetDate,
    expired: diff === 0,
  };
}
