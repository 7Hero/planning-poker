import { useEffect, useMemo, useState } from "react";
import { useRoomStore } from "../stores/room";
import { useParams } from "react-router";
import { useUserStore } from "../stores/user";
import { CardSelection } from "../components/card-selection";
import { Button } from "../components/button";
import { CardList } from "../components/cards-list";

const PokerRoom = () => {
  const { roomId } = useParams();
  const joinRoom = useRoomStore((state) => state.joinRoom);
  const username = useUserStore((state) => state.username);
  const users = useRoomStore((state) => state.users);
  const leaveRoom = useRoomStore((state) => state.leaveRoom);
  const [revealed, setRevealed] = useState(false);

  const votesCount = useMemo(
    () => users.reduce((prev, user) => (user.voted ? prev + 1 : prev), 0),
    [users]
  );

  useEffect(() => {
    joinRoom(roomId!, username);
    return () => leaveRoom(roomId!);
  }, []);

  return (
    <div className="h-full text-primary flex flex-1 justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <p>
          {votesCount} of {users.length} voted 👀
        </p>
        <div className="flex gap-8 flex-wrap justify-center">
          {users.map((user) => (
            <CardList key={user.socketId} user={user} revealed={revealed} />
          ))}
        </div>
        <Button className="mt-8" onClick={() => setRevealed(!revealed)}>
          Reveal cards
        </Button>
      </div>
      <div className="fixed flex flex-1 bottom-4 justify-center p-8">
        <CardSelection />
      </div>
    </div>
  );
};

export { PokerRoom };
