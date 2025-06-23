export type ThemeProps = {
  theme: string;
  setTheme: (theme: string) => void;
}
export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
}
