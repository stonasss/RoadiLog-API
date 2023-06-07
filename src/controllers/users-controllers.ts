import { Request, Response } from "express";
import { registerSchema } from "../schemas/users-schema.js";
import { userServices } from "../services/users-services.js";
import httpStatus from 'http-status';
import { ApplicationError, LoginUser, RegisterUser } from "../utils/protocols.js";
import { errorHandler } from "../middlewares/error-handler-middlware.js";

async function register(req: Request, res: Response) {
    const user = req.body as RegisterUser;
    const { error } = registerSchema.validate(user);

    if (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: error.message,
        });
    }

    const {name, email, password} = req.body;

    try {
        await userServices.createUser({ name, email, password });
        res.status(httpStatus.CREATED).send({});
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
}

async function login(req: Request, res: Response) {
    const login = req.body as LoginUser
}

export const userControllers = {
    register,
}