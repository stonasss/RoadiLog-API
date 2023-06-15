import { Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandler } from "../middlewares/error-handler-middlware";
import { ApplicationError, NewProject } from "../utils/protocols";
import { projectSchema } from "../schemas/projects-schema";
import { userServices } from "../services/users-services";
import { projectServices } from "../services/projects-services";

async function newProject(req: Request, res: Response) {
    const project = req.body as NewProject;
    const userToken = res.locals.user;

    const { error } = projectSchema.validate(project)
    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });

    const { name, instruments, description } = req.body;

    try { 
        const userId = await userServices.retrieveSession(userToken);
        if (!userId) return res.status(httpStatus.UNAUTHORIZED);

        const result = await projectServices.createProject({ name, instruments, description, userId });
        return res.status(httpStatus.CREATED).send({ result });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
}

export const projectControllers = {
    newProject,
}