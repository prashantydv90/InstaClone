import express from "express";
 import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const msgRouter = express.Router();

msgRouter.route('/send/:id').post(isAuthenticated, sendMessage);
msgRouter.route('/all/:id').get(isAuthenticated, getMessage);
 
export default msgRouter;