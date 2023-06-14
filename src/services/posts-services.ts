import { errors } from "../errors/index.js";
import { postRepositories } from "../repositories/posts-repositories.js";

async function createPost({ title, description, link, userOnline }) {
    await postRepositories.createPost({ title, description, link, userOnline });
}

export const postServices = {
    createPost,
}