import { useState } from "react";
import { Button } from "./button";

const JoinRoomForm = () => {
  const [name, setName] = useState("");

  const generateRoomId = () => {
    return crypto.randomUUID();
  };

  const handleJoinRoom = () => {
    generateRoomId();
  };

  return (
    <div className="flex flex-col gap-4 p-6 shadow-sm rounded-2xl w-full max-w-[400px] bg-card border-border border">
      <div className="flex flex-col gap-2">
        <p className="text-[15px] font-medium text-primary">
          Enter your username
        </p>
        <p className="text-sm text-tertiary">
          Enter your username to join a room.
        </p>
      </div>
      <label htmlFor="username" className="text-sm font-medium text-primary">
        Username
      </label>
      <input
        id="username"
        type="text"
        autoComplete="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-primary text-sm box-content text-primary"
      />
      <Button
        disabled={!name.trim()}
        type="button"
        onClick={handleJoinRoom}
        className="py-2 px-4 text-background disabled:cursor-not-allowed disabled:bg-primary/70"
      >
        Join Room
      </Button>
    </div>
  );
};

export { JoinRoomForm };
