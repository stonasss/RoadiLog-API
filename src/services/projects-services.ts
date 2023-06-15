import httpStatus from "http-status";
import { errors } from '../errors/index.js';
import { projectRepositories } from '../repositories/projects-repositories.js'

async function createProject({ name, instruments, description, userId }) {
    const project = await projectRepositories.createProject({ name, instruments, description, userId });
    return project;
};

export const projectServices = {
    createProject,
};
