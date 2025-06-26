import type { CardType } from "@planning-poker/types";
import { useState } from "react";
import { cn } from "../utils";
import { useRoomStore } from "../stores";
import { useShallow } from "zustand/shallow";

const CARDS: CardType[] = [
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "?",
  "☕",
];

const CardSelection = () => {
  const [selectedCard, setSelected] = useState<CardType>(null);
  const { socket, getCurrentUser, isGameOver } = useRoomStore(
    useShallow((state) => ({
      socket: state.socket,
      getCurrentUser: state.getCurrentUser,
      isGameOver: state.isGameOver,
    }))
  );

  const handleCardSelection = (card: CardType) => {
    if (card === selectedCard) {
      socket.emit("vote", null);
      setSelected(null);
    } else {
      socket.emit("vote", card);
      setSelected(card);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>Pick a card 👇</div>
      <div className="flex gap-4 items-center justify-around sm:justify-center flex-wrap">
        {CARDS.map((card) => (
          <button
            onClick={() => handleCardSelection(card)}
            disabled={isGameOver}
            key={card}
            className={cn(
              "px-2 py-4 border border-border rounded-lg w-[50px] flex items-center justify-center transition-all duration-200 transform",
              selectedCard === card && getCurrentUser()?.voted
                ? "bg-primary -translate-y-2 shadow-lg"
                : "bg-card"
            )}
          >
            <span
              className={cn(
                "text-2xl",
                selectedCard === card && getCurrentUser()?.voted
                  ? "text-card"
                  : "text-primary"
              )}
            >
              {card}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export { CardSelection };
