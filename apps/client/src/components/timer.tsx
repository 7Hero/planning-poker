import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils";
import { Select } from "./select";
import { useParams } from "react-router";
import { useRoomStore, useUserStore } from "../stores";
import { Button } from "./button";
import { useShallow } from "zustand/shallow";

const TIMER_OPTIONS = [
  { value: 15, label: "15 seconds" },
  { value: 30, label: "30 seconds" },
  { value: 60, label: "1 minute" },
];

const Timer = () => {
  const { roomId } = useParams();

  const [selected, setSelected] = useState<number>(TIMER_OPTIONS[0].value);
  const [remaining, setRemaining] = useState<number>(0);

  const username = useUserStore((state) => state.username);
  const { socket, isGameOver, running, expiresAt } = useRoomStore(
    useShallow((state) => ({
      socket: state.socket,
      isGameOver: state.isGameOver,
      running: state.timer.running,
      expiresAt: state.timer.expiresAt,
    }))
  );

  const intervalRef = useRef(0).current;

  useEffect(() => {
    if (!running || isGameOver) {
      clearInterval(intervalRef);
      setRemaining(0);
      return;
    }

    const update = () => {
      const secondsLeft = Math.max(0, expiresAt - Date.now());
      setRemaining(Math.floor(secondsLeft / 1000));
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [running, expiresAt, intervalRef, isGameOver]);

  const handleTimer = () => {
    if (selected && !running) {
      socket.emit("start-timer", roomId!, selected);
    } else {
      socket.emit("stop-timer", roomId!);
    }
  };

  if (!username) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center">
      {running ? (
        <span className="text-primary text-sm">{formatTime(remaining)}</span>
      ) : (
        <Select
          disabled={isGameOver}
          options={TIMER_OPTIONS}
          onChange={(value) => setSelected(value as number)}
        />
      )}
      <Button onClick={handleTimer} disabled={isGameOver}>
        {running ? "Reset timer 🔄" : "Start timer ▶️"}
      </Button>
    </div>
  );
};

export { Timer };
