import { CardType, RoomState, UserState } from "@planning-poker/types";

const users: Map<string, UserState> = new Map();
const rooms: Map<string, RoomState> = new Map();
const timers: Map<string, NodeJS.Timeout> = new Map();

const getUsersByRoomId = (roomId: string) => {
  return Array.from(users.values()).filter(u => u.roomId === roomId)
}

const addUser = (roomId: string, username: string, socketId: string) => {
  const user: UserState = { roomId, username, socketId, voted: false, voteValue: null };
  users.set(socketId, user);

  return user;
};

const getUser = (socketId: string) => {
  return users.get(socketId)!;
}

const removeUser = (socketId: string): [UserState, boolean] => {

  const userDeleted = getUser(socketId);
  const isDeleted = users.delete(socketId);

  if (userDeleted) {
    const roomUsers = getUsersByRoomId(userDeleted.roomId);
    if (roomUsers.length === 0) {
      rooms.delete(userDeleted.roomId);
    }
  }

  return [userDeleted, isDeleted];
};

const updateUser = (socketId: string, voteValue: CardType) => {
  const user = getUser(socketId)

  user.voted = voteValue ? true : false;
  user.voteValue = voteValue;

  return user;
}

const getRoom = (roomId: string) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { isGameOver: false });
  }
  return rooms.get(roomId)!;
}

const revealRoom = (roomId: string) => {
  const room = getRoom(roomId);
  room.isGameOver = true;
}

const newRound = (roomId: string) => {
  const room = getRoom(roomId);
  const users = getUsersByRoomId(roomId);

  users.forEach(user => { user.voteValue = null; user.voted = false })
  room.isGameOver = false;
}

const maskUserVote = (users: UserState[]) => {
  return users.map(user => ({ ...user, voteValue: null }));
}

const getRoomState = (roomId: string) => {
  const room = getRoom(roomId);
  const users = getUsersByRoomId(roomId);

  if (!room.isGameOver) {
    room.isGameOver = users.every(user => user.voted);;
  }

  return {
    isGameOver: room.isGameOver,
    users: room.isGameOver ? users : maskUserVote(users)
  }
}

export { rooms, users, timers, addUser, getUser, updateUser, removeUser, getRoom, revealRoom, newRound, getRoomState };