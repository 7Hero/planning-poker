import { createContext, useEffect, useState } from "react";
import type { ThemeProps, ThemeProviderProps } from "../types/theme";

const MEDIA = '(prefers-color-scheme: dark)';

const getTheme = (defaultTheme: string) => {
  return localStorage.getItem('theme') || defaultTheme;
}

const getSystemTheme = () => {
  return window.matchMedia(MEDIA).matches ? 'dark' : 'light';
}

const ThemeContext = createContext<ThemeProps | undefined>(undefined)

const ThemeProvider = ({ children, defaultTheme = 'light' }: ThemeProviderProps) => {
  const theme = getTheme(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<string>(() => theme === 'system' ? getSystemTheme() : theme);

  useEffect(() => {
    console.log(`Theme set to: ${resolvedTheme}`);
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem('theme', resolvedTheme);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme: setResolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


export { ThemeProvider, ThemeContext };