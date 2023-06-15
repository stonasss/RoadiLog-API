import prisma from "../config/database.js";
import { ValidProject } from "../utils/protocols.js";


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

export const projectRepositories = {
    createProject,
}