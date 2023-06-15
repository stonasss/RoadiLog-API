import { errors } from "../errors/index.js";
import { postRepositories } from "../repositories/posts-repositories.js";

async function createPost({ title, description, link, userToken }) {
    await postRepositories.createPost({ title, description, link, userToken });
}

async function getPosts() {
    const result = await postRepositories.getPosts();
    return result;
}

export const postServices = {
    createPost,
    getPosts,
}