import { errors } from "../errors/index.js";
import { postRepositories } from "../repositories/posts-repositories.js";

async function createPost({ title, description, link, userId }) {
    await postRepositories.createPost({ title, description, link, userId });
}

async function getPosts() {
    const result = await postRepositories.getPosts();
    return result;
}

export const postServices = {
    createPost,
    getPosts,
}