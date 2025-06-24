import { useEffect } from "react";
import { useRoomStore } from "../stores/room";
import { useParams } from "react-router";
import { useUserStore } from "../stores/user";
import { CardSelection } from "../components/card-selection";

const PokerRoom = () => {
  const { roomId } = useParams();
  const joinRoom = useRoomStore((state) => state.joinRoom);
  const username = useUserStore((state) => state.username);
  const users = useRoomStore((state) => state.users);
  const leaveRoom = useRoomStore((state) => state.leaveRoom);

  useEffect(() => {
    joinRoom(roomId!, username);
    return () => leaveRoom(roomId!);
  }, []);

  return (
    <div className="h-full text-primary flex flex-1 justify-center items-center">
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user.socketId}
            className="flex items-center justify-between p-2 bg-card border-border border rounded-lg"
          >
            <img
              src={`https://anonymous-animals.azurewebsites.net/avatar/${user.username}`}
            />
            <span className="text-sm">{user.username}</span>
            <span className="text-xs text-tertiary">
              {user.voted ? "Voted" : "Not Voted"}
            </span>
          </div>
        ))}

        <CardSelection />
      </div>
    </div>
  );
};

export { PokerRoom };
