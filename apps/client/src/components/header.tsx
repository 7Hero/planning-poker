import { Check, Copy } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { Link } from "react-router";
import { Button } from "./button";
import { useCopyToClipboard } from "../hooks";
import { cn } from "../utils";

const VerticalSeparator = () => <div className="w-px h-4 bg-primary/30 mx-2" />;

const Header = () => {
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <header className="flex items-center justify-between h-16 p-4 border-b border-b-border">
      <div className="flex items-center">
        <div className="font-medium text-primary">Scrum Poker 🎲</div>
        <VerticalSeparator />
        <Button
          title="copy url to clipboard"
          className="p-2 bg-transparent hover:bg-primary/10 active:bg-primary/20 active:scale-95 relative flex items-center justify-center"
          onClick={() => copy(window.location.href)}
        >
          <Check
            width={16}
            height={16}
            className={cn(
              "text-primary transition-opacity duration-200",
              isCopied ? "opacity-100" : "opacity-0"
            )}
          />
          <Copy
            width={16}
            height={16}
            className={cn(
              "text-primary absolute transition-opacity duration-200",
              isCopied ? "opacity-0" : "opacity-100"
            )}
          />
        </Button>
      </div>
      <div className="flex items-center">
        <Link
          title="Create new room"
          to="/"
          className="mr-1 text-sm px-3 py-2 rounded-lg text-primary bg-card border border-border hover:bg-card/30 active:bg-card/30 active:scale-98 transition-all"
        >
          New Room <span className="ml-1">✨</span>
        </Link>
        <VerticalSeparator />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export { Header };
