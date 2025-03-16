import { Router } from "express";
import userController from "../controllers/user.controller";
import { checkAuth } from "../middleware/auth.middleware";


const userRouter = Router()

userRouter.post('/register', userController.addUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/logout', userController.logout)
userRouter.get('/check-auth', userController.getUserByUsername)
// what is thie error?????


export default userRouter