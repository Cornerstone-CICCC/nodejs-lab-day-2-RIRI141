"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
// import use
const home = (req, res) => {
    res.status(200).send("Welcome to my server!");
};
// const signup = (req: Request, res: Response) => {
//     res.status(200).send("Welcome to signup!")
// }
// const login = (req: Request, res: Response) => {
//     res.status(200).send("Welcome to login!")
// }
/**
 * Get all users
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
const getUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.status(200).json(users);
};
/**
 * Get user by Username
 *
 * @param {Request<{username: string}>} req
 * @param {Respose} res
 * @returns {void}
 */
const getUserByUsername = (req, res) => {
    const { username } = req.params;
    const user = user_model_1.default.getUserByUsername(username);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.status(200).json(user);
};
/**
 * Add new User
 *
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
        res.status(500).json({
            error: "Username/password/Firstname/Lastname is empty"
        });
        return;
    }
    const user = yield user_model_1.default.addUser({ username, password, firstname, lastname });
    if (!user) {
        res.status(409).json({
            error: "Username is taken"
        });
        return;
    }
    res.status(201).json(user);
});
/**
 * Login User
 *
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void}
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({
            error: "Username/password is wrong"
        });
        return;
    }
    const user = yield user_model_1.default.checkUserPass(username, password);
    if (!user) {
        res.status(500).json({
            error: "Login infomation is wrong"
        });
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).send("You Login");
});
exports.default = {
    home,
    // signup,
    // login,
    getUsers,
    getUserByUsername,
    addUser,
    loginUser,
};
