import prisma from '../config/database.js'
import { RegisterUser } from '../utils/protocols.js'

async function createUser({ name, email, password, photo_url }: RegisterUser) {
    return prisma.users.create({
        data: {
            name,
            email,
            password,
            photo_url,
        },
    });
};

async function findByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
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

export const userRepositories = {
    createUser,
    findByEmail,
    findSession,
    createSession,
}