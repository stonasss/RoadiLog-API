import { Request, Response, NextFunction } from "express";
import { userRepositories } from "../repositories/users-repositories.js"
import httpStatus from "http-status";

export async function authValidate(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const userId = authorization?.replace("Bearer ", "");

    if (!userId) return res.status(httpStatus.UNAUTHORIZED).send("Token not found")

    try {
        const sessionExists = await userRepositories.findSessionByToken(userId)

        if (!sessionExists) return res.status(httpStatus.UNAUTHORIZED).send("Authentication error");
        res.locals.user = sessionExists.token;

        next()
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    };
}