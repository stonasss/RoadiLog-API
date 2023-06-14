import bcrypt from 'bcrypt';
import { errors } from '../errors/index.js';
import { userRepositories } from '../repositories/users-repositories.js';
import jwt from 'jsonwebtoken';

async function createUser({ name, email, password, image }) {
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

async function loginUser({ email, password }) {
    const userExists = await userRepositories.findByEmail(email);
    if (!userExists) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const userToken = await userRepositories.findSession(userExists.id)
    if (!userToken) {
        const newToken = jwt.sign({ user_id: userExists.id }, process.env.JWT_SECRET, { expiresIn: '12h'});
        await userRepositories.createSession(userExists.id, newToken);
        return newToken;
    }
    return userToken.token;
}

async function retrieveUsers() {
    const result = await userRepositories.getUsers();
    if (!result) throw errors.notFoundError();
    return result;
}

async function retrieveId(token: string) {
    const result = await userRepositories.findByToken(token);
    if (!result) throw errors.notFoundError();
    return result.user_id;
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
    retrieveId,
    deleteUser,
}