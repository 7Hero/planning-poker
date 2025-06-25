import { Server } from "socket.io";
import { addUser, getRoom, getRoomState, getUser, newRound, removeUser, revealRoom, updateUser } from "./db";
import type { UserState, WSClientToServerEvents, WSServerToClientEvents } from "@planning-poker/types";

const io = new Server<WSClientToServerEvents, WSServerToClientEvents>({ cors: { origin: "*" } });

io.on("connection", (socket) => {


  socket.on("join-room", (roomId, username) => {
    const user = addUser(roomId, username, socket.id);
    const room = getRoom(roomId);

    socket.join(roomId);

    io.to(roomId).emit("state-update", getRoomState(roomId))

    console.info(`User ${username} joined room: ${roomId}`);
  });

  socket.on("vote", (voteValue) => {
    const user = updateUser(socket.id, voteValue);
    io.to(user.roomId).emit('state-update', getRoomState(user.roomId))
  })


  socket.on("reveal", (roomId) => {
    revealRoom(roomId)

    io.to(roomId).emit("state-update", getRoomState(roomId))

    console.info(`Room ${roomId} has been revealed/restarted`);
  })

  socket.on("new-round", (roomId: string) => {
    newRound(roomId);

    io.to(roomId).emit("state-update", getRoomState(roomId))
  })

  socket.on("leave-room", (roomId) => {
    const [user] = removeUser(socket.id)
    socket.leave(roomId);

    io.to(roomId).emit("state-update", getRoomState(roomId))

    console.info(`User ${user?.username} left room: ${user?.roomId}`);
  });

  socket.on("disconnect", () => {
    const [user, isDeleted] = removeUser(socket.id);

    if (isDeleted) {
      io.to(user.roomId).emit("state-update", getRoomState(user.roomId))
    }

    console.info(`User ${user?.username} left room: ${user?.roomId}`);
  })
});

io.listen(4000);
