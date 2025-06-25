import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Button, Card, CardSelection } from "../components";
import { useRoomStore, useUserStore } from "../stores";

const PokerRoom = () => {
  const { roomId } = useParams();
  const username = useUserStore((state) => state.username);
  const users = useRoomStore((state) => state.users);
  const isGameOver = useRoomStore((state) => state.isGameOver);
  const socket = useRoomStore((state) => state.socket);

  const handleReveal = () => {
    if (!isGameOver) {
      socket.emit("reveal", roomId!);
    } else {
      socket.emit("new-round", roomId!);
    }
  };

  const votesCount = useMemo(
    () => users.reduce((prev, user) => (user.voted ? prev + 1 : prev), 0),
    [users]
  );

  useEffect(() => {
    socket.on("connect", () => socket.emit("join-room", roomId!, username));
    socket.emit("join-room", roomId!, username);
    return () => {
      socket.emit("leave-room", roomId!);
    };
  }, []);

  return (
    <div className="h-full text-primary flex flex-1 justify-center sm:items-center pt-12">
      <div className="flex flex-col items-center gap-4">
        <p>
          {votesCount} of {users.length} voted 👀
        </p>
        <div className="flex gap-2 sm:gap-8 flex-wrap justify-around sm:justify-center px-2">
          {users.map((user) => (
            <Card key={user.socketId} user={user} revealed={isGameOver} />
          ))}
        </div>
        <Button
          className="mt-8"
          onClick={handleReveal}
          disabled={!isGameOver && votesCount === 0}
        >
          {isGameOver ? "Restart round" : "Reaveal cards"}
        </Button>
      </div>
      <div className="fixed flex flex-1 bottom-8 justify-center px-4">
        <CardSelection />
      </div>
    </div>
  );
};

export { PokerRoom };
