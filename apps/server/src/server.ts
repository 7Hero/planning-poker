import { Server } from "socket.io";
import { addUser, findUserBySocketId, getUsersByRoomId, removeSocketFromUser, users } from "./db";
import type { WSClientToServerEvents, WSServerToClientEvents } from "@planning-poker/types";

const io = new Server<WSClientToServerEvents, WSServerToClientEvents>({ cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, username) => {
    const user = addUser(roomId, username, socket.id);
    socket.join(roomId);
    socket.emit('room-state', getUsersByRoomId(roomId));
    socket.to(roomId).emit("user-joined", user);

    console.info(`User joined room: ${username}, Room: ${roomId}`);
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
    const user = removeSocketFromUser(socket.id);
    if (user) {
      socket.to(user.roomId).emit("user-left", users);
    }

    console.info(`User ${user?.username} left room: ${user?.roomId}`);
  });

  socket.on("vote", (voteValue) => {
    const user = findUserBySocketId(socket.id);
    if (user) {
      user.voted = true;
      user.voteValue = voteValue;
      io.to(user.roomId).emit('room-state', getUsersByRoomId(user.roomId))
    }

  })
  socket.on("disconnect", () => {
    const user = removeSocketFromUser(socket.id);
    if (user) {
      socket.to(user.roomId).emit("user-left", getUsersByRoomId(user.roomId));
    }

    console.info(`User ${user?.username} left room: ${user?.roomId}`);
  })
});

io.listen(4000);
