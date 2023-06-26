import { ProjectToUpdate } from "@/utils/protocols";
import { errors } from "../errors/index";
import { projectRepositories } from "../repositories/projects-repositories";

async function createProject({ name, instruments, description, userId }: any) {
    const project = await projectRepositories.createProject({
        name,
        instruments,
        description,
        userId,
    });
    return project;
}

async function deleteProject(id: string) {
    const projectId = parseInt(id);

    const project = await projectRepositories.getProjectById(projectId);
    if (!project) throw errors.notFoundError();

    const result = await projectRepositories.deleteProject(projectId);
    return result;
}

async function getProjectById(id: string) {
    const projectId = parseInt(id);
    const project = await projectRepositories.getProjectById(projectId);

    if (!project) throw errors.notFoundError();
    return project;
}

async function getProjects() {
    const result = await projectRepositories.getProjects();
    return result;
}

async function getProjectsByUserId(id: string) {
    const userId = parseInt(id);
    const userProjects = await projectRepositories.getProjectsByUser(userId);
    return userProjects;
}

async function updateProject({
    name,
    instruments,
    description,
    id,
}: ProjectToUpdate) {
    const projectId = parseInt(id);
    const project = await projectRepositories.updateProject({
        name,
        instruments,
        description,
        projectId,
    });
    return project;
}

export const projectServices = {
    createProject,
    deleteProject,
    getProjectById,
    getProjectsByUserId,
    updateProject,
    getProjects,
};
