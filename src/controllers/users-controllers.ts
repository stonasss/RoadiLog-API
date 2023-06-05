import { Request, Response, NextFunction } from "express";
import { registerSchema } from "../schemas/users-schema";
import { userServices } from "../services/users-services";
import httpStatus from 'http-status';

async function register(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const { error } = registerSchema.validate(user);

    if (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: error.message,
        });
    }
    const {username, email, password} = req.body;

    try {
        await userServices.createUser({ name, email, password });
        res.status(httpStatus.CREATED);
    } catch (err) {
        next(err)
    };
}

export const userControllers = {
    register,
}