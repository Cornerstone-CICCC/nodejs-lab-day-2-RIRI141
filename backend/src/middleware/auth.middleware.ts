import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.isLoggedIn) {
        return  next()
    }
    res.status(401).send({ message: "Unauthorized" })
}