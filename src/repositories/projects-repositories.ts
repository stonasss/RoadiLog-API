import prisma from "../config/database.js";
import { EditProject, ValidProject } from "../utils/protocols.js";


async function createProject({ name, instruments, description, userId }: ValidProject) {
    return prisma.projects.create({
        data: {
            userId,
            name,
            instruments,
            description,
        },
    });
};

async function deleteProject(projectId: number) {
    return prisma.projects.delete({
        where: {
            id: projectId,
        },
    });
};

async function updateProject({ name, instruments, description, projectId }: EditProject) {
    return prisma.projects.update({
        where: {
            id: projectId,
        },
        data: {
            name,
            instruments,
            description,
        },
    });
};

async function getProjects() {
    return prisma.projects.findMany();
};

async function getProjectById(projectId: number) {
    return prisma.projects.findFirst({
        where: {
            id: projectId,
        },
    });
};

async function getProjectsByUser(userId: number) {
    return prisma.projects.findMany({
        where: {
            userId,
        },
    });
};

export const projectRepositories = {
    createProject,
    deleteProject,
    getProjects,
    getProjectById,
    getProjectsByUser,
    updateProject,
};
