import bcrypt from 'bcrypt';
import { errors } from '../errors/index';
import { userRepositories } from '../repositories/users-repositories';
import jwt from 'jsonwebtoken';
import { create } from 'domain';

async function createUser({ name, email, password, image }: any) {
    const userExists = await userRepositories.findByEmail(email);

    if (userExists) throw errors.duplicatedEmail();

    const hashedPasswd: string = await bcrypt.hash(password, 10);
    await userRepositories.createUser({
        name,
        email,
        password: hashedPasswd,
        image,
    });
};

async function loginUser({ email, password }: any) {
    const userExists = await userRepositories.findByEmail(email);
    if (!userExists) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const token = jwt.sign({ id: userExists.id }, process.env.SECRET_KEY);

    await userRepositories.createSession(token, userExists.id)
    return token
}

async function retrieveUsers() {
    const result = await userRepositories.getUsers();
    if (!result) throw errors.notFoundError();
    return result;
}

async function retrieveSession(userToken: string) {
    const result = await userRepositories.findSessionByToken(userToken);
    if (!result) throw errors.notFoundError();
    return result.id;
}

async function retrieveUserById(id: string) {
    const userId = parseInt(id)

    const result = await userRepositories.findById(userId)
    if (!result) throw errors.notFoundError();
    return result;
}

async function deleteUser(id: number) {
    const result = await userRepositories.findById(id);
    if (!result) throw errors.notFoundError();
    const deleted = await userRepositories.deleteUser(id);
    return deleted;
}

export const userServices = {
    createUser,
    loginUser,
    retrieveUsers,
    retrieveUserById,
    retrieveSession,
    deleteUser,
}