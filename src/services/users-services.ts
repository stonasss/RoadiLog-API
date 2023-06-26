import bcrypt from "bcrypt";
import { errors } from "../errors/index";
import { userRepositories } from "../repositories/users-repositories";
import jwt from "jsonwebtoken";
import { LoginUser, User } from "@/utils/protocols";

async function createUser({ name, email, password, image }: User) {
    const userExists = await userRepositories.findByEmail(email);

    if (userExists) throw errors.duplicatedEmail();

    const hashedPasswd: string = await bcrypt.hash(password, 10);
    await userRepositories.createUser({
        name,
        email,
        password: hashedPasswd,
        image,
    });
}

async function loginUser({ email, password }: LoginUser) {
    const userExists = await userRepositories.findByEmail(email);
    if (!userExists) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const userId = Number(userExists.id);
    const token = jwt.sign({ id: userExists.id }, process.env.SECRET_KEY);

    const userInfo = await userRepositories.createSession(token, userId);
    return userInfo;
}

async function retrieveUsers() {
    const result = await userRepositories.getUsers();
    if (!result) throw errors.notFoundError();
    return result;
}

async function retrieveSession(userToken: string) {
    const result = await userRepositories.findSessionByToken(userToken);
    if (!result) throw errors.notFoundError();
    return result.userId;
}

async function retrieveSessionToDelete(userToken: string) {
    const result = await userRepositories.findSessionByToken(userToken);
    if (!result) throw errors.notFoundError();
    return result;
}

async function retrieveUserById(id: string) {
    const userId = parseInt(id);

    const result = await userRepositories.findById(userId);
    if (!result) throw errors.notFoundError();
    return result;
}

async function deleteUser(id: string) {
    const userId = parseInt(id);

    const user = await userRepositories.getUserById(userId);
    if (!user) throw errors.notFoundError();

    const result = await userRepositories.deleteUser(userId);
    return result;
}

async function deleteSession(id: string) {
    const userId = parseInt(id);

    const user = await userRepositories.getUserById(userId);
    if (!user) throw errors.notFoundError();

    const result = await userRepositories.deleteSession(userId);
    return result;
}

export const userServices = {
    createUser,
    loginUser,
    retrieveUsers,
    retrieveUserById,
    retrieveSession,
    retrieveSessionToDelete,
    deleteUser,
    deleteSession,
};
