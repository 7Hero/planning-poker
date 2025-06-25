import type { UserState } from "@planning-poker/types";
import { cn } from "../utils";
import { useMemo } from "react";

const Card = ({ user, revealed }: { user: UserState; revealed: boolean }) => {
  const cardValue = useMemo(
    () => (revealed ? user.voteValue : null),
    [revealed, user]
  );

  return (
    <div className="flex flex-col gap-2 items-center" key={user.socketId}>
      <div
        className={cn(
          "relative min-w-[100px] min-h-[132px] perspective-distant transition-cool transition-all duration-500 transform-3d",
          revealed && "rotate-y-180"
        )}
      >
        <div
          className={cn(
            "backface-hidden transition-all duration-200 absolute w-full h-full rounded-xl flex items-center justify-center shadow-lg border border-dashed border-border",
            !user.voted &&
              "bg-zing-700 dark:bg-zinc-800 border-dashed border border-zinc-400 dark:border-zinc-600",
            user.voted &&
              "bg-blue-500/90 dark:bg-blue-600/80 border-blue-600 ring-2 ring-blue-300 dark:ring-blue-500 text-white shadow-xl"
          )}
        >
          {user.voted ? (
            <span className="text-4xl font-bold animate-bounce">✔️</span>
          ) : (
            <span className="text-2xl font-semibold text-zinc-400 dark:text-zinc-500">
              ❔
            </span>
          )}
        </div>
        <div
          className={cn(
            "absolute backface-hidden rotate-y-180 w-full h-full top-0 left-0 rounded-xl flex items-center justify-center transition-all duration-500 transform shadow-lg border border-dashed border-border"
          )}
        >
          <span className="text-4xl font-semibold">
            {cardValue ?? (
              <span className="text-zinc-400 dark:text-zinc-500">–</span>
            )}
          </span>
        </div>
      </div>
      <span
        className={cn(
          "text-sm font-semibold text-zinc-400 dark:text-zinc-500 max-w-[100px] overflow-hidden text-ellipsis",
          user.voted && !revealed && "text-blue-600 dark:text-blue-400",
          revealed && "text-blue-600 dark:text-blue-400"
        )}
      >
        {user.username}
      </span>
      <span
        className={cn(
          "text-xs font-medium",
          user.voted
            ? "text-green-600 dark:text-green-400"
            : "text-zinc-400 dark:text-zinc-500"
        )}
      >
        {revealed
          ? user.voted
            ? "Voted"
            : "No Vote"
          : user.voted
          ? "Voted"
          : "Not Voted"}
      </span>
    </div>
  );
};

export { Card };
