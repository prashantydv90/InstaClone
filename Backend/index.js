import express,{urlencoded} from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./app/routes/user.routes.js";
import cookieParser from "cookie-parser";
import postRouter from "./app/routes/post.routes.js";
import msgRouter from "./app/routes/message.routes.js";
import { app, server } from "./app/socket/socket.js";
import path from 'path';

const __dirname=path.resolve();


dotenv.config();


app.use(cookieParser())
// app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin:process.env.URL,
    credentials: true
}
app.use(cors(corsOptions));



// Routes
app.use('/api', userRouter);
app.use('/api',postRouter)
app.use('/api',msgRouter)

// app.use(express.static(path.join(__dirname,'/frontend/dist')));

// Connect to MongoDB and start server
mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(process.env.PORT || 1112, () => {
      console.log("Server is running on port", process.env.PORT || 1112);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
