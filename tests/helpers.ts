import * as jwt from 'jsonwebtoken';
import prisma from 'config/database';
import { users } from '@prisma/client';
import { createUser } from './factories/users-factory';
import { createSession } from './factories/sessions-factory';

export async function cleanDb() {
    await prisma.merch.deleteMany({});
    await prisma.projects.deleteMany({});
    await prisma.posts.deleteMany({});
    await prisma.sessions.deleteMany({});
    await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.SECRET_KEY );

    await createSession(token);

    return token;
}
