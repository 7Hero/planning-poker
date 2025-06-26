import { Server } from "socket.io";
import { addUser, getRoom, getRoomState, getUser, newRound, removeUser, revealRoom, rooms, timers, updateUser } from "./db";
import type { UserState, WSClientToServerEvents, WSServerToClientEvents } from "@planning-poker/types";

const io = new Server<WSClientToServerEvents, WSServerToClientEvents>({ cors: { origin: "*" } });

io.on("connection", (socket) => {


  socket.on("join-room", (roomId, username) => {
    const user = addUser(roomId, username, socket.id);
    const room = getRoom(roomId);

    socket.join(roomId);

    socket.emit("identity", socket.id);
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

    io.to(roomId).emit("timer-update", { running: false, expiresAt: 0 })
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

    if (isDeleted && rooms.has(user.roomId)) {
      io.to(user.roomId).emit("state-update", getRoomState(user.roomId))
    }

    console.info(`User ${user?.username} left room: ${user?.roomId}`);
  })

  socket.on("start-timer", (roomId, time) => {
    const expiresAt = Date.now() + (time * 1000);
    io.to(roomId).emit("timer-update", { running: true, expiresAt })

    const timeoutHandler = setTimeout(() => {
      revealRoom(roomId)

      io.to(roomId).emit("timer-update", { running: false, expiresAt: 0 })
      io.to(roomId).emit("state-update", getRoomState(roomId))
    }, time * 1000)

    timers.set(roomId, timeoutHandler);

    console.info(`Started timer in room: ${roomId}, for ${time} seconds`);
  })

  socket.on("stop-timer", (roomId) => {
    if (timers.has(roomId)) {
      clearTimeout(timers.get(roomId))
      io.to(roomId).emit("timer-update", { running: false, expiresAt: 0 })
    }

    console.info(`Stopped timer in room: ${roomId}.`);

  })
});

io.listen(4000);
