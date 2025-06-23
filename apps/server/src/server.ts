import { Server } from "socket.io";
import { JoinEvent, LeaveEvent } from "@planning-poker/types";


const io = new Server({ cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join-room", (roomId: JoinEvent) => {
    socket.join(roomId);
  });
  socket.on("leave-room", (roomId: LeaveEvent) => {
    socket.leave(roomId);
  });
});

io.listen(4000);
