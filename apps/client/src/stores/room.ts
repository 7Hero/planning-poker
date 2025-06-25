import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import type { UserState, WSClientToServerEvents, WSServerToClientEvents } from "@planning-poker/types";
import { useUserStore } from "./user";

const socket = io(import.meta.env.VITE_WS_URL, {
  autoConnect: true,
  transports: ['websocket']
});


type RoomState = {
  users: UserState[],
  isGameOver: boolean;
  socket: Socket<WSServerToClientEvents, WSClientToServerEvents>;
  getCurrentUser: () => UserState;
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

  socket.on("state-update", (state) => {
    set(({ users: state.users, isGameOver: state.isGameOver }))
  })

  return {
    users: [],
    isGameOver: false,
    socket,
    getCurrentUser: () => {
      const username = useUserStore.getState().username;
      return get().users.find(u => u.username === username) as UserState;
    },

  }
})