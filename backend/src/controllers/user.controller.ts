import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
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

const getUserByUsername = (req: Request, res: Response) => {
    if (req.session &&  req.session.username) {
        const user = userModel.findByUsername(req.session.username);
        res.status(200).json(user);
        return
    }
        return res.status(404).json({ error: "User not found" })
  
};
/**
 * Add new User
 * 
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
const addUser = async ( req: Request<{},{}, Omit<User, 'id'>>, res: Response) => {
    console.log("Received data:", req.body); 

    const { username, password, firstname, lastname} = req.body
    if(!username || !password || !firstname || !lastname) {
        res.status(500).json({
            error: "Username/password/Firstname/Lastname is empty"
        })
        return
    }
    const user = await userModel.create({ username, password ,firstname, lastname})
    if(!user) {
        res.status(409).json({
            error: "Username is taken"
        })
        return
    }
    res.status(201).json(user)
}

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
    res.status(200).send("You Logged in")
}

/**
 * Logouted user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Redirect to signup
 */
const logout = (req: Request, res: Response) => {
    req.session = null;
    res.status(200).json({
      content: "Session cookie cleared!",
    });
  };



export default {
    // home,
    // signup,
    // login,
    // getUsers,
    getUserByUsername,
    addUser,
    // deleteUserById,
    loginUser,
    logout
}