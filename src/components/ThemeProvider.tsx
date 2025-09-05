"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  themeDark: boolean;
  setThemeDark: (theme: boolean) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeDark, setThemeDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Resolve hydration mismatch by checking localStorage after mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeDark(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setThemeDark(prefersDark);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", themeDark ? "dark" : "light");
    }
  }, [themeDark, mounted]);

  return (
    <ThemeContext.Provider value={{ themeDark, setThemeDark, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
