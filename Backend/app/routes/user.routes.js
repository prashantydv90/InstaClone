import e from "express";
import { deletePhoto, editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";



let userRouter=e.Router();

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/logout',logout)
userRouter.get('/:id/profile', isAuthenticated, getProfile);
userRouter.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile);
userRouter.route('/profile/delPhoto').post(isAuthenticated, deletePhoto);
userRouter.route('/suggested').get(isAuthenticated,getSuggestedUsers);
userRouter.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

export default userRouter;
