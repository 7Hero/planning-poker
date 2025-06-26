import { useState } from "react";
import { cn } from "../utils";
import { ChevronDown } from "lucide-react";

type SelectProps = React.ComponentProps<"button"> & {
  options: {
    value: string | number;
    label: string;
  }[];

  onChange: (value: string | number) => void;
};

const Select = ({ options, onChange, ...rest }: SelectProps) => {
  const [isOpen, setOpen] = useState(false);
  const [_selected, _setSelected] = useState<{
    value: string | number;
    label: string;
  }>();
  const [hovered, setHovered] = useState<string | number | null>(null);

  return (
    <button
      {...rest}
      className="text-primary px-3 py-2 border border-border bg-card rounded-lg text-sm relative w-[180px]"
      onClick={() => setOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-2">
        <span>{_selected ? _selected.label : "Select a timer"}</span>
        <ChevronDown
          width={14}
          height={14}
          className={cn(
            isOpen && "rotate-180",
            "transition-transform duration-150"
          )}
        />
      </div>
      {isOpen && (
        <div className="text-primary group w-full bg-card text-left absolute top-full animate-slide-down origin-top border-border mt-2 border p-1 left-0 rounded-lg">
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  _setSelected(option);
                  onChange(option.value);
                }}
                onMouseEnter={() => setHovered(option.value)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "px-3 py-2 w-full cursor-pointer hover:bg-primary/10 rounded-md",
                  hovered == option.value && "bg-primary/10",
                  "group-hover:bg-transparent group-hover:not-hover:bg-transparent"
                )}
                key={option.value}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
};

export { Select };
