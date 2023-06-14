import prisma from '../config/database.js'
import { RegisterUser } from '../utils/protocols.js'

async function createUser({ name, email, password, image }: RegisterUser) {
    return prisma.users.create({
        data: {
            name,
            email,
            password,
            image,
        },
    });
};

async function getUsers() {
    return prisma.users.findMany();
};

async function findByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
        },
    });
};

async function findById(id: number) {
    return prisma.users.findFirst({
        where: {
            id,
        },
    });
};

async function findSession(id: number) {
    return prisma.sessions.findFirst({
        where: {
            id,
        },
    });
};

async function createSession(id: number, token: string) {
    return prisma.sessions.create({
        data: {
            user_id: id,
            token: token,
        },
    });
};

async function deleteUser(id: number) {
    return prisma.users.delete({
        where: {
            id,
        },
    });
};

export const userRepositories = {
    createUser,
    getUsers,
    findByEmail,
    findSession,
    createSession,
    findById,
    deleteUser,
}