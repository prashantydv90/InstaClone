// src/socket.js
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");

const socket = io("http://localhost:1111", {
  query: { userId },
  withCredentials: true,
});

export default socket;
