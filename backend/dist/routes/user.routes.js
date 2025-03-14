"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', user_controller_1.default.home);
// userRouter.get('/signup', userController.signup)
// userRouter.get('/login', userController.login)
userRouter.get('/users', user_controller_1.default.getUsers);
userRouter.get('/:username', user_controller_1.default.getUserByUsername);
userRouter.post('/login', user_controller_1.default.loginUser);
userRouter.post('/signup', user_controller_1.default.addUser);
exports.default = userRouter;
