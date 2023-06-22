import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/users-schema";
import { userServices } from "../services/users-services";
import httpStatus from 'http-status';
import { 
    ApplicationError, 
    CheckId, 
    LoginUser, 
    RegisterUser, 
} from "../utils/protocols";
import { errorHandler } from "../middlewares/error-handler-middlware";
import { userRepositories } from "../repositories/users-repositories";
import prisma from "../config/database";

async function register(req: Request, res: Response) {
    const user = req.body as RegisterUser;
    const { error } = registerSchema.validate(user);

    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    const {name, email, password, image} = req.body;

    try {
        await userServices.createUser({ name, email, password, image });
        res.status(httpStatus.CREATED).send({ name, email, image });
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
        if (token) {
            const image = await userRepositories.findByEmail( email )
            return res.status(httpStatus.OK).send({ token, image });
        }
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
};

async function getUsers(req: Request, res: Response) {
    try {
        const users = await userServices.retrieveUsers();
        return res.status(httpStatus.OK).send({ users });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
}

async function deleteUser(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;

    try {
        const user = await userServices.retrieveUserById(id)
        if (!user) return res.status(httpStatus.BAD_REQUEST).send("User not found")

        const userId = await userServices.retrieveSessionToDelete(userToken)
        if (user.id !== userId.userId) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request")

        await userServices.deleteSession(id)
        await userServices.deleteUser(id)
        return res.status(httpStatus.NO_CONTENT).send({})
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
}

export const userControllers = {
    register,
    login,
    getUsers,
    deleteUser,
}