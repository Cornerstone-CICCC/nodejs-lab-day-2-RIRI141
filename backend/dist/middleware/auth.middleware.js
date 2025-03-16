"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        return next();
    }
    res.status(401).send({ message: "Unauthorized" });
};
exports.checkAuth = checkAuth;
