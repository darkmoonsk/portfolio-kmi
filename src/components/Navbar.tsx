"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  CalendarDays,
  Sparkles,
  Link2,
  Moon,
  SunMedium,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SOCIALS } from "@/app/constants/socials";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";

export function Navbar() {
  const { themeDark, setThemeDark } = useTheme();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/fotos/kmi-anime.png"
              width={96}
              height={96}
              className="rounded-full"
              alt="Kmi"
            />
            <span className="font-bangers text-2xl font-bold">KMI</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {SOCIALS.map((s) => (
              <Tooltip key={s.name}>
                <TooltipTrigger asChild>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <s.icon className="size-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{s.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-2 ml-2 border-l border-border/50">
            <SunMedium className="size-4 opacity-70" />
            <Switch
              checked={themeDark}
              onCheckedChange={(v) => setThemeDark(v)}
              aria-label="Alternar tema"
            />
            <Moon className="size-4 opacity-70" />
          </div>
          <a
            href="https://www.twitch.tv/rukimegumi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="cursor-pointer ml-2 font-bangers">
              <Link2 className="mr-2 size-4" />
              Streams
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
