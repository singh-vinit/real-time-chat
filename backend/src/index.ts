import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(4000);

const wss = new WebSocketServer({ server: httpServer });

type Value = {
  username: string;
  ws: WebSocket;
};

const rooms: { [key: string]: Value[] } = {};

type Data = {
  action: string;
  roomId: string;
  username?: string;
  message?: string;
};

let ROOM_ID: string;

wss.on("connection", function connection(ws) {
  ws.on("message", function message(message: string) {
    const msg = message.toString();
    const data: Data = JSON.parse(msg);

    switch (data.action) {
      case "create":
        if (rooms[data.roomId]) {
          ROOM_ID = data.roomId;
          ws.send(
            JSON.stringify({
              action: "info",
              success: false,
              message: "Room Already exist!",
            })
          );
        } else {
          rooms[data.roomId] = [];
          rooms[data.roomId].push({ username: data.username || "", ws: ws });
          ws.send(
            JSON.stringify({
              action: "info",
              success: false,
              message: "Created And Joined The Room!",
            })
          );
        }
        break;

      case "join":
        if (rooms[data.roomId]) {
          ROOM_ID = data.roomId;
          rooms[data.roomId].push({ username: data.username || "", ws: ws });
          ws.send(
            JSON.stringify({
              action: "info",
              success: true,
              message: "Joined The Room!",
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              action: "info",
              success: false,
              message: "Room Does Not Exist!",
            })
          );
        }
        break;

      case "message":
        const clients = rooms[data.roomId].filter((client) => client.ws != ws);
        clients.forEach((client, ind) => {
          client.ws.send(
            JSON.stringify({
              action: "message",
              username: data.username,
              message: data.message,
            })
          );
        });
        break;

      case "leave":
        rooms[data.roomId] = rooms[data.roomId].filter(
          (client) => client.ws != ws
        );
        if (rooms[data.roomId].length === 0) {
          delete rooms[data.roomId];
        }
        ws.close();
        console.log("leave the room!");
        break;
    }

    //   ws.on("close", function close() {
    //     console.log("Client disconnected");
    //     rooms[ROOM_ID] = rooms[ROOM_ID].filter((client) => client.ws != ws);
    //     if (rooms[ROOM_ID].length === 0) {
    //       delete rooms[ROOM_ID];
    //     }
    //   });
  });

  ws.send("hello from the server");
});
