import { Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandler } from "../middlewares/error-handler-middlware.js";
import { ApplicationError, CheckId, NewProject } from "../utils/protocols.js";
import { projectSchema } from "../schemas/projects-schema.js";
import { userServices } from "../services/users-services.js";
import { projectServices } from "../services/projects-services.js";

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
};

async function deleteProject(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;

    try {
        const projectExists = await projectServices.getProjectById(id);
        if (!projectExists) return res.status(httpStatus.BAD_REQUEST).send("Project does not exist");

        const userId = await userServices.retrieveSession(userToken);
        if (projectExists.userId !== userId) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request");

        await projectServices.deleteProject(id);
        return res.status(httpStatus.OK).send("Project deleted")
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function updateProject(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;
    const project = req.body as NewProject;

    const { error } = projectSchema.validate(project);
    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });

    const { name, instruments, description } = req.body;

    try {
        const projectExists = await projectServices.getProjectById(id);
        if (!projectExists) return res.status(httpStatus.BAD_REQUEST).send("Project does not exist");

        const userId = await userServices.retrieveSession(userToken)
        if (projectExists.userId !== userId) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request");

        const result = await projectServices.updateProject({ name, instruments, description, id });
        return res.status(httpStatus.OK).send({ result });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function getProjects(req: Request, res: Response) {
    try {
        const projects = await projectServices.getProjects();
        return res.status(httpStatus.OK).send({ projects });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

export const projectControllers = {
    newProject,
    deleteProject,
    updateProject,
    getProjects,
};
