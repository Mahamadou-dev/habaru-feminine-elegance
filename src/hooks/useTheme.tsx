import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";
export type ColorTheme = "rose" | "lavender" | "beige" | "emerald" | "ocean";
export type FontFamily = "playfair" | "cormorant" | "inter";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  fontFamily: FontFamily;
  toggleTheme: () => void;
  setColorTheme: (theme: ColorTheme) => void;
  setFontFamily: (font: FontFamily) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || "light";
    }
    return "light";
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("colorTheme");
      return (stored as ColorTheme) || "rose";
    }
    return "rose";
  });

  const [fontFamily, setFontFamilyState] = useState<FontFamily>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("fontFamily");
      return (stored as FontFamily) || "playfair";
    }
    return "playfair";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Gérer le thème light/dark
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Gérer le thème de couleur
    root.setAttribute("data-theme", colorTheme);
    
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  useEffect(() => {
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const fontMap: Record<FontFamily, { display: string; body: string }> = {
      playfair: { display: "Playfair Display", body: "Inter" },
      cormorant: { display: "Cormorant Garamond", body: "Inter" },
      inter: { display: "Inter", body: "Inter" },
    };
    
    root.style.setProperty("--font-display", fontMap[fontFamily].display);
    root.style.setProperty("--font-body", fontMap[fontFamily].body);
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setColorTheme = (newTheme: ColorTheme): void => {
    setColorThemeState(newTheme);
  };

  const setFontFamily = (font: FontFamily): void => {
    setFontFamilyState(font);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorTheme,
        fontFamily,
        toggleTheme,
        setColorTheme,
        setFontFamily,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};