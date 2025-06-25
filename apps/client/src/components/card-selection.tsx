import type { CardType } from "@planning-poker/types";
import { useRoomStore } from "../stores/room";
import { useState } from "react";
import { cn } from "../utils";

const CARD_LIST: CardType[] = [
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

  const currentUser = useRoomStore((state) => state.getCurrentUser);
  const vote = useRoomStore((state) => state.vote);

  const handleCardSelection = (card: CardType) => {
    if (card === currentUser()?.voteValue) {
      vote(false, null);
      setSelected(null);
    } else {
      vote(true, card);
      setSelected(card);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>Pick a card 👇</div>
      <div className="flex gap-4 items-center justify-center flex-wrap">
        {CARD_LIST.map((card) => (
          <button
            onClick={() => handleCardSelection(card)}
            key={card}
            className={cn(
              "px-2 py-4 border border-border rounded-lg w-[50px] flex items-center justify-center transition-all duration-200 transform",
              selectedCard === card
                ? "bg-primary -translate-y-2 shadow-lg"
                : "bg-card"
            )}
          >
            <span
              className={cn(
                "text-2xl",
                selectedCard === card ? "text-card" : "text-primary"
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
