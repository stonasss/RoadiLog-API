import { Request, Response } from "express";
<<<<<<< HEAD
import { loginSchema, registerSchema } from "../schemas/users-schema.js";
=======
import { registerSchema } from "../schemas/users-schema.js";
>>>>>>> 42612d601ce1250339e141758dd8196f9bcee283
import { userServices } from "../services/users-services.js";
import httpStatus from 'http-status';
import { ApplicationError, LoginUser, RegisterUser } from "../utils/protocols.js";
import { errorHandler } from "../middlewares/error-handler-middlware.js";

async function register(req: Request, res: Response) {
    const user = req.body as RegisterUser;
    const { error } = registerSchema.validate(user);

<<<<<<< HEAD
    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    const {name, email, password, photo_url} = req.body;

    try {
        await userServices.createUser({ name, email, password, photo_url });
=======
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: error.message,
        });
    }

    const {name, email, password} = req.body;

    try {
        await userServices.createUser({ name, email, password });
>>>>>>> 42612d601ce1250339e141758dd8196f9bcee283
        res.status(httpStatus.CREATED).send({});
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function login(req: Request, res: Response) {
    const login = req.body as LoginUser;
    const { error } = loginSchema.validate(login);

    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    const { email, password } = req.body;

    try {
        const token = await userServices.loginUser({ email, password });
        return res.status(httpStatus.OK).send({ token });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
};

async function login(req: Request, res: Response) {
    const login = req.body as LoginUser
}

export const userControllers = {
    register,
    login,
}