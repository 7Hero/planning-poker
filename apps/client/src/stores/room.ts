import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import type { TimerState, UserState, WSClientToServerEvents, WSServerToClientEvents } from "@planning-poker/types";

const socket = io(import.meta.env.VITE_WS_URL, {
  autoConnect: true,
  transports: ['websocket']
});


type RoomState = {
  socket: Socket<WSServerToClientEvents, WSClientToServerEvents>;
  users: UserState[],
  isGameOver: boolean;
  timer: TimerState;
  currentUserId: string | null;
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

  socket.on("identity", (socketId) => {
    set({ currentUserId: socketId })
  })

  socket.on("state-update", (state) => {
    set(({ users: state.users, isGameOver: state.isGameOver }))
  })

  socket.on("timer-update", (state) => {
    set({ timer: state })
  })

  return {
    socket,
    users: [],
    currentUserId: null,
    isGameOver: false,
    timer: { expiresAt: 0, running: false },

    getCurrentUser: () => {
      return get().users.find(u => u.socketId === get().currentUserId) as UserState;
    },
  }
})