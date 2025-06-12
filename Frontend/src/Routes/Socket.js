// src/socket.js
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");

const socket = io("https://instaclone-mmf6.onrender.com", {
  query: { userId },
  withCredentials: true,
});

export default socket;
