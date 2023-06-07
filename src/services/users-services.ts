import bcrypt from 'bcrypt';
import { errors } from '../errors/index.js';
import { userRepositories } from '../repositories/users-repositories.js';
import jwt from 'jsonwebtoken';

async function createUser({ name, email, password, photo_url }) {
    const userExists = await userRepositories.findByEmail(email);

    if (userExists) throw errors.duplicatedEmail();

    const hashedPasswd: string = await bcrypt.hash(password, 10);
    await userRepositories.createUser({
        name,
        email,
        password: hashedPasswd,
        photo_url,
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

export const userServices = {
    createUser,
    loginUser,
}