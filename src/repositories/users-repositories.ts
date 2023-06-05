import prisma from '../config/database'
import { RegisterUser } from '../protocols/users'

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