import { Router } from "express";
import userController from "../controllers/user.controller";


const userRouter = Router()

userRouter.get('/', userController.home)
// userRouter.get('/signup', userController.signup)
// userRouter.get('/login', userController.login)
userRouter.get('/users', userController.getUsers)
userRouter.get('/:username', userController.getUserByUsername)
userRouter.post('/login', userController.loginUser)
userRouter.post('/signup', userController.addUser)


export default userRouter