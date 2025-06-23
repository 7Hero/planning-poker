import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Button } from "./button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      className="p-2 bg-transparent hover:bg-primary/10 active:bg-primary/20 active:scale-95"
    >
      {theme === "light" ? (
        <Sun width={16} height={16} className="text-primary" />
      ) : (
        <Moon width={16} height={16} className="text-primary" />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
