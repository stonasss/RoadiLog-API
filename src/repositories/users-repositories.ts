import prisma from '../config/database.js'
import { RegisterUser } from '../utils/protocols.js'

async function createUser({ name, email, password }: RegisterUser) {
    return prisma.users.create({
        data: {
            name,
            email,
            password,
        }
    })
};

async function findByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
        },
    })
};

export const userRepositories = {
    createUser,
    findByEmail,
}