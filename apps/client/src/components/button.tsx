import { cn } from "../utils";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">;

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        "px-4 py-2 bg-primary cursor-pointer disabled:cursor-not-allowed disabled:bg-primary/70 hover:bg-primary/90 active:bg-primary/90 active:scale-98 text-background rounded-lg transition-all duration-200 text-sm",
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
