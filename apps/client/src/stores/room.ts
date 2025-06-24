import { io } from "socket.io-client";
import { create } from "zustand";
import type { CardType, UserState } from "@planning-poker/types";
import { useUserStore } from "./user";

const socket = io(import.meta.env.VITE_WS_URL, {
  autoConnect: true,
  transports: ['websocket']
});


type RoomState = {
  users: UserState[],
  isGameOver: boolean;
  getCurrentUser: () => UserState;
  connect: () => void;
  joinRoom: (roomId: string, username: string) => void;
  leaveRoom: (roomId: string) => void;
  vote: (vote: boolean, voteValue: CardType) => void;
}

export const useRoomStore = create<RoomState>((set, get) => {
  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });

  socket.on("connect_error", (error) => {
    console.error("WebSocket connection error:", error);
  });

  socket.on("user-joined", user => {
    set(state => ({ users: [...state.users, user] }))
  })

  socket.on("room-state", (users) => {
    set(({ users }))
    console.log(users);
  })

  socket.on("user-left", users => {
    set(({ users }))
  })


  return {
    users: [],
    isGameOver: false,
    getCurrentUser: () => {
      const username = useUserStore.getState().username;
      return get().users.find(u => u.username === username) as UserState;
    },
    connect: () => {
      if (!socket.connected) {
        socket.connect();
      }
    },
    joinRoom: (roomId, username) => {
      socket.emit("join-room", roomId, username);
    },
    leaveRoom: (roomId) => {
      socket.emit("leave-room", roomId)
    },
    vote: (voted, voteValue) => {
      socket.emit("vote", voted, voteValue);
    }
  }
})