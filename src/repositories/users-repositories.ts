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

async function findSessionById(userId: number) {
    return prisma.sessions.findFirst({
        where: {
            id: userId,
        },
    });
};

async function findSessionByToken(token: string) {
    return prisma.sessions.findFirst({
        where: {
            token: token,
        }
    })
}

async function createSession(token: string, userId: number) {
    return prisma.sessions.upsert({
        where: {
            id: userId,
        },
        create: {
            userId,
            token
        },
        update: {
            token
        }
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
    findSessionById,
    findSessionByToken,
    createSession,
    findById,
    deleteUser,
}