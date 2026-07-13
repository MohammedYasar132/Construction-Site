import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const themeProfiles = {
  anbGold: {
    name: "ANB Gold (Default)",
    variables: {
      "--color-primary": "#ffb400", // Vibrant Yellow/Gold
      "--color-primary-hover": "#e09e00",
      "--color-primary-light": "#fff4db",
      "--color-secondary": "#111111", // Deep Black
      "--color-secondary-hover": "#222222",
      "--color-accent": "#ffb400",
      "--color-dark": "#0a0a0a",
      "--color-dark-card": "#1a1a1a",
      "--color-light": "#f8f9fa",
      "--color-bg": "#ffffff",
      "--color-surface": "#f9fafb",
      "--color-text-primary": "#111827",
      "--color-text-secondary": "#4b5563",
    },
  },
  corporateBlue: {
    name: "Corporate Blue",
    variables: {
      "--color-primary": "#1d4ed8", // Rich Indigo Blue
      "--color-primary-hover": "#1e40af",
      "--color-primary-light": "#dbeafe",
      "--color-secondary": "#0f172a", // Slate Dark
      "--color-secondary-hover": "#1e293b",
      "--color-accent": "#38bdf8",
      "--color-dark": "#020617",
      "--color-dark-card": "#0f172a",
      "--color-light": "#f8fafc",
      "--color-bg": "#ffffff",
      "--color-surface": "#f1f5f9",
      "--color-text-primary": "#0f172a",
      "--color-text-secondary": "#475569",
    },
  },
  ecoGreen: {
    name: "Eco Green",
    variables: {
      "--color-primary": "#059669", // Deep Emerald Green
      "--color-primary-hover": "#047857",
      "--color-primary-light": "#d1fae5",
      "--color-secondary": "#1f2937", // Cool Grey
      "--color-secondary-hover": "#374151",
      "--color-accent": "#10b981",
      "--color-dark": "#111827",
      "--color-dark-card": "#1f2937",
      "--color-light": "#f9fafb",
      "--color-bg": "#ffffff",
      "--color-surface": "#f3f4f6",
      "--color-text-primary": "#111827",
      "--color-text-secondary": "#4b5563",
    },
  },
  crimsonSteel: {
    name: "Crimson Industrial",
    variables: {
      "--color-primary": "#dc2626", // Heavy Crimson Red
      "--color-primary-hover": "#b91c1c",
      "--color-primary-light": "#fee2e2",
      "--color-secondary": "#1e293b", // Deep Slate
      "--color-secondary-hover": "#334155",
      "--color-accent": "#ef4444",
      "--color-dark": "#0f172a",
      "--color-dark-card": "#1e293b",
      "--color-light": "#f8fafc",
      "--color-bg": "#ffffff",
      "--color-surface": "#f1f5f9",
      "--color-text-primary": "#0f172a",
      "--color-text-secondary": "#475569",
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("anbGold");
  const [darkMode, setDarkMode] = useState(true);

  const applyTheme = (themeName, isDark) => {
    const root = document.documentElement;
    const profile = themeProfiles[themeName] || themeProfiles.anbGold;

    // Apply the theme variables
    Object.entries(profile.variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Handle dark mode variations
    if (isDark) {
      root.classList.add("dark");
      root.style.setProperty("--color-bg", "#0f172a");
      root.style.setProperty("--color-surface", "#1e293b");
      root.style.setProperty("--color-text-primary", "#f8fafc");
      root.style.setProperty("--color-text-secondary", "#94a3b8");
    } else {
      root.classList.remove("dark");
      root.style.setProperty("--color-bg", "#ffffff");
      root.style.setProperty(
        "--color-surface",
        profile.variables["--color-surface"],
      );
      root.style.setProperty(
        "--color-text-primary",
        profile.variables["--color-text-primary"],
      );
      root.style.setProperty(
        "--color-text-secondary",
        profile.variables["--color-text-secondary"],
      );
    }
  };

  useEffect(() => {
    applyTheme(currentTheme, darkMode);
  }, [currentTheme, darkMode]);

  const selectTheme = (themeName) => {
    if (themeProfiles[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeName: themeProfiles[currentTheme]?.name || "",
        selectTheme,
        darkMode,
        toggleDarkMode,
        themeProfiles,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
