import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
// import use

const home = (req: Request, res: Response) => {
    res.status(200).send("Welcome to my server!")
}
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
const getUsers = (req: Request, res: Response) => {
    const users = userModel.findAll();
    res.status(200).json(users);
  };

/**
 * Get user by Username
 * 
 * @param {Request<{username: string}>} req
 * @param {Respose} res
 * @returns {void} 
 */

const getUserByUsername = (req:Request<{username: string}>, res:Response) => {
    const { username } = req.params
    const user = userModel.getUserByUsername(username)
    if(!user) {
        res.status(404).send("User not found")
        return
    }
    res.status(200).json(user)
}

/**
 * Add new User
 * 
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
const addUser = async ( req: Request<{},{}, Omit<User, 'id'>>, res: Response) => {
    const { username, password, firstname, lastname} = req.body
    if(!username || !password || !firstname || !lastname) {
        res.status(500).json({
            error: "Username/password/Firstname/Lastname is empty"
        })
        return
    }
    const user = await userModel.addUser({ username, password ,firstname, lastname})
    if(!user) {
        res.status(409).json({
            error: "Username is taken"
        })
        return
    }
    res.status(201).json(user)
}

/**
 * Login User 
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void}
 */
const loginUser = async ( req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password } = req.body
    if(!username || !password) {
        res.status(500).json({
            error: "Username/password is wrong"
        })
        return
    }
    const user = await userModel.checkUserPass(username, password)
    if(!user) {
        res.status(500).json({
            error: "Login infomation is wrong"
        })
        return 
    }
    if(req.session) {
        req.session.isLoggedIn = true
        req.session.username = user.username
    }
    res.status(200).send("You Login")
}




export default {
    home,
    // signup,
    // login,
    getUsers,
    getUserByUsername,
    addUser,
    loginUser,

}