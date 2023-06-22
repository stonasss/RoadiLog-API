import prisma from '../config/database'
import { RegisterUser } from '../utils/protocols'

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

async function getUserById(userId: number) {
    return prisma.users.findFirst({
        where: {
            id: userId,
        }
    })
}

async function findByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
        },
    });
};

async function findById(userId: number) {
    return prisma.users.findFirst({
        where: {
            id: userId,
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

async function findSessionByToken(userToken: string) {
    return prisma.sessions.findFirst({
        where: {
            token: userToken,
        }
    })
}

async function createSession(token: string, userId: number) {
    return await prisma.sessions.upsert({
        where: {
            userId,
        },
        create: {
            userId,
            token
        },
        update: {
            token
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

async function deleteSession(id: number) {
    return prisma.sessions.delete({
        where: {
            userId: id,
        }
    })
}

export const userRepositories = {
    createUser,
    getUsers,
    getUserById,
    findByEmail,
    findSessionById,
    findSessionByToken,
    createSession,
    findById,
    deleteUser,
    deleteSession
}