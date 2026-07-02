import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // 1. Check localStorage persistence
    const saved = localStorage.getItem("serena_theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;

    // 2. Fallback to OS preferences on first visit
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Smooth transition class helper
    root.classList.add("theme-transition");
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    localStorage.setItem("serena_theme", theme);

    // Set browser color-scheme metadata property dynamically
    root.style.colorScheme = theme;

    // Remove transition helper class after animations settle
    const timer = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 400);
    return () => clearTimeout(timer);
  }, [theme]);

  // Sync with OS theme changes in real-time
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const hasLocalPreference = localStorage.getItem("serena_theme") !== null;
      if (!hasLocalPreference) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
