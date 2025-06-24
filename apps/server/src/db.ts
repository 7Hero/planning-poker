import { UserState } from "@planning-poker/types";

const users: UserState[] = [];
const rooms = [];

const findUserByUsername = (username: string) => {
  return users.find(user => user.username === username);
};

const findUserBySocketId = (socketId: string) => {
  return users.find(user => user.socketId === socketId);
};

const getUsersByRoomId = (roomId: string) => {
  return users.filter(user => user.roomId === roomId);
}

const addUser = (roomId: string, username: string, socketId: string) => {
  const existingIndex = users.findIndex(user => user.username === username);
  if (existingIndex !== -1) {
    users.splice(existingIndex, 1);
  }

  const newUser: UserState = {
    socketId,
    username,
    roomId,
    voted: false,
    voteValue: null,
  };
  users.push(newUser);

  return newUser;
};

const removeSocketFromUser = (socketId: string) => {
  const userIndex = users.findIndex(user => user.socketId === socketId);
  if (userIndex !== -1) {
    const [user] = users.splice(userIndex, 1);
    return user;
  }
  return null;
};

export { users, addUser, getUsersByRoomId, findUserBySocketId, findUserByUsername, removeSocketFromUser };