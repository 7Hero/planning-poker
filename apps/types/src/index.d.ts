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

export type RoomState = {
  isGameOver: boolean;
}

type WSClientToServerEvents = {
  "join-room": (roomId: string, username: string) => void;
  "leave-room": (roomId: string) => void;
  "vote": (voteValue: CardType) => void;
  "reveal": (roomId: string) => void;
  "new-round": (roomId: string) => void;
}

type WSServerToClientEvents = {
  "state-update": (users: { users: UserState[], isGameOver: boolean }) => void;
}