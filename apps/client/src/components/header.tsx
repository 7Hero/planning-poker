import { Copy } from "lucide-react";
import { Button } from "./button";
import { ThemeSwitcher } from "./theme-switcher";
import { Link } from "react-router";

const VerticalSeparator = () => <div className="w-px h-4 bg-primary/30 mx-2" />;

const Header = () => {
  return (
    <header className="flex items-center justify-between h-14 p-4">
      <div className="flex items-center">
        <Link to="/" className="font-medium text-primary">
          Scrum Poker 🎲
        </Link>
        <VerticalSeparator />
        <Button className="p-2 bg-transparent hover:bg-primary/10 active:bg-primary/20 active:scale-95">
          <Copy width={16} height={16} className="text-primary" />
        </Button>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export { Header };
