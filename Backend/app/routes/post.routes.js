import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
postRouter.route("/all").get(isAuthenticated,getAllPost);
postRouter.route("/userpost/all").get(isAuthenticated, getUserPost);
postRouter.route("/:id/like").get(isAuthenticated, likePost);
postRouter.route("/:id/dislike").get(isAuthenticated, dislikePost);
postRouter.route("/:id/comment").post(isAuthenticated, addComment); 
postRouter.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
postRouter.route("/delete/:id").delete(isAuthenticated, deletePost);
postRouter.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

export default postRouter;
