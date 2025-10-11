import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ColorTheme = "rose" | "lavender" | "beige";
type FontFamily = "playfair" | "cormorant" | "inter";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  fontFamily: FontFamily;
  toggleTheme: () => void;
  setColorTheme: (theme: ColorTheme) => void;
  setFontFamily: (font: FontFamily) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "light";
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem("colorTheme");
    return (stored as ColorTheme) || "rose";
  });

  const [fontFamily, setFontFamilyState] = useState<FontFamily>(() => {
    const stored = localStorage.getItem("fontFamily");
    return (stored as FontFamily) || "playfair";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", colorTheme);
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const fontMap = {
      playfair: { display: "Playfair Display", body: "Inter" },
      cormorant: { display: "Cormorant Garamond", body: "Inter" },
      inter: { display: "Inter", body: "Inter" },
    };
    root.style.setProperty("--font-display", fontMap[fontFamily].display);
    root.style.setProperty("--font-body", fontMap[fontFamily].body);
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setColorTheme = (newTheme: ColorTheme) => {
    setColorThemeState(newTheme);
  };

  const setFontFamily = (font: FontFamily) => {
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
