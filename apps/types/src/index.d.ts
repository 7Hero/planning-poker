export type JoinEvent = string;

export type LeaveEvent = string;

export type CardType = null | '1' | '2' | '3' | '5' | '8' | '13' | '21' | '34' | '55' | "?" | "☕";

export type UserState = {
  socketId: string;
  roomId: string;
  username: string;
  voted: boolean
  voteValue: CardType;
};

type WSClientToServerEvents = {
  "join-room": (roomId: string, username: string) => void;
  "leave-room": (roomId: string) => void;
  "vote": (voted: boolean, voteValue: CardType) => void;
}

type WSServerToClientEvents = {
  "room-state": (users: UserState[]) => void;
  "user-joined": (user: UserState) => void;
  "user-left": (users: UserState[]) => void;
}