"use client";

import React from "react";
import { SOCIALS } from "@/app/constants/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>© {year} KMI Cosplay. Todos los derechos reservados.</span>
        </div>

        <div className="flex items-center gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label={social.name}
            >
              <social.icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
