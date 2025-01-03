import { io } from "socket.io-client";

export let socket;

export const connectSocket = async (token) => {
  const connection = new Promise((resolve, reject) => {
    socket = io("http://localhost:3001", {
      auth: {
        token: token || null,
      },
    });

    socket.on("connect", () => {
      resolve(socket);
      console.log("socket connected");
    });
    socket.on("connect_error", (error) => {
      reject(error);
      console.log("socket connection error", error);
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
  });
  return await connection;
};

export const emitEvent = (event, data) => {
  if (socket) {
    socket.emit(event, data);
  }
};

export const handleEventResponse = (event, callback) => {
  if (socket) {
    socket.on(event, (data) => {
      callback(data);
    });
  }
};

export const cancelEventResponse = (event) => {
  if (socket) {
    socket.off(event);
  }
};
