import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/users-schema";
import { userServices } from "../services/users-services";
import httpStatus from 'http-status';
import { 
    ApplicationError, 
    LoginUser, 
    RegisterUser, 
    VerifyId 
} from "../utils/protocols";
import { errorHandler } from "../middlewares/error-handler-middlware";
import { userRepositories } from "../repositories/users-repositories";

async function register(req: Request, res: Response) {
    const user = req.body as RegisterUser;
    const { error } = registerSchema.validate(user);

    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    const {name, email, password, image} = req.body;

    try {
        await userServices.createUser({ name, email, password, image });
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
    const { id } = req.body as VerifyId;

    try {
        await userServices.deleteUser(id);
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