import { Navigate, Outlet, useParams } from "react-router";
import { JoinRoomModal } from "../components/join-room-modal";
import { useUserStore } from "../stores/user";

const ProtectedRoute = () => {
  const { roomId } = useParams();
  const { username, setUsername } = useUserStore();

  const handleRoomJoin = (username: string) => {
    setUsername(username);
  };

  if (!roomId) {
    return <Navigate to={`/room/${crypto.randomUUID()}`} replace />;
  }

  if (!username?.trim()) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <JoinRoomModal onRoomJoin={handleRoomJoin} />
      </div>
    );
  }

  return <Outlet />;
};

export { ProtectedRoute };
