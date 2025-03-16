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
// const home = (req: Request, res: Response) => {
//     res.status(200).send("Welcome to my server!")
// }
// // const signup = (req: Request, res: Response) => {
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
// const getUsers = (req: Request, res: Response) => {
//     const users = userModel.findAll();
//     if (!users) {
//         res.status(500).json({
//           message: "No users",
//         });
//     }    
//     res.status(200).json(users);
//   };
/**
 * Get user by Username
 *
 * @param {Request} req
 * @param {Respose} res
 * @returns {void}
 */
const getUserByUsername = (req, res) => {
    if (req.session && req.session.username) {
        const user = user_model_1.default.findByUsername(req.session.username);
        res.status(200).json(user);
        return;
    }
    return res.status(404).json({ error: "User not found" });
};
/**
 * Add new User
 *
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received data:", req.body);
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
        res.status(500).json({
            error: "Username/password/Firstname/Lastname is empty"
        });
        return;
    }
    const user = yield user_model_1.default.create({ username, password, firstname, lastname });
    if (!user) {
        res.status(409).json({
            error: "Username is taken"
        });
        return;
    }
    res.status(201).json(user);
});
/**
 * Delete by userID
 *
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void}
 *
 */
// const deleteUserById = (req:Request<{id: string}>, res: Response) => {
//     const { id } = req.params
//     const result: boolean = userModel.removeUserById(id)
//     if(!result) {
//         res.status(404).json({ message: "User not found" })
//         return
//     }
//     res.status(200).json({ message: "Deleted User"})
// }
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
    res.status(200).send("You Logged in");
});
/**
 * Logouted user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Redirect to signup
 */
const logout = (req, res) => {
    req.session = null;
    res.status(200).json({
        content: "Session cookie cleared!",
    });
};
exports.default = {
    // home,
    // signup,
    // login,
    // getUsers,
    getUserByUsername,
    addUser,
    // deleteUserById,
    loginUser,
    logout
};
