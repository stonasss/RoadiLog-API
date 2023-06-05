import bcrypt from 'bcrypt';
import { errors } from '../errors/index';
import { userRepositories } from '../repositories/users-repositories';

async function createUser({ name, email, password }) {
    const result = await userRepositories.findByEmail(email);

    if (result) throw errors.duplicatedEmail(email);
    const hashedPasswd: string = await bcrypt.hash(password, 10);
    await userRepositories.createUser({
        name,
        email,
        password: hashedPasswd,
    });
};

export const userServices = {
    createUser,
}