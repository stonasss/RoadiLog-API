import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import prisma from 'config/database';
import { users } from '@prisma/client';

export async function createUser(params: Partial<users> = {}): Promise<users> {
    const incomingPassword = params.password || faker.internet.password(6);
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return prisma.users.create({
        data: {
            name: params.name || faker.name.firstName(),
            email: params.email || faker.internet.email(),
            password: hashedPassword,
        },
    });
}
