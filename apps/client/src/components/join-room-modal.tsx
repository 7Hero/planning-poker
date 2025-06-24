import { Button } from "./button";
import { useState } from "react";

const JoinRoomModal = ({
  onRoomJoin,
}: {
  onRoomJoin: (username: string) => void;
}) => {
  const [_username, _setUsername] = useState("");

  return (
    <form
      className="flex flex-col gap-4 p-6 shadow-sm rounded-2xl w-full max-w-[400px] bg-card border-border border"
      onSubmit={(e) => {
        e.preventDefault();
        onRoomJoin(_username);
      }}
    >
      <div className="flex flex-col gap-2 items-center">
        <span className="text-3xl">👋</span>
        <p className="text-[15px] font-medium text-primary flex items-center gap-1">
          Enter your username
        </p>
        <p className="text-sm text-tertiary flex items-center gap-1">
          Enter your username to join a room.
        </p>
      </div>
      <label
        htmlFor="username"
        className="text-sm font-medium text-primary flex items-center gap-1"
      >
        <span>Username</span>
      </label>
      <input
        id="username"
        type="text"
        autoComplete="username"
        value={_username}
        onChange={(e) => _setUsername(e.target.value)}
        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-primary text-sm box-content text-primary"
        placeholder="e.g. vasea"
      />
      <Button
        disabled={!_username.trim()}
        className="py-2 px-4 text-background disabled:cursor-not-allowed disabled:bg-primary/80"
      >
        Join Room
      </Button>
    </form>
  );
};

export { JoinRoomModal };
