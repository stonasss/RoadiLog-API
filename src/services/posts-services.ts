import { errors } from "../errors";
import { postRepositories } from "../repositories/posts-repositories";

async function createPost({ title, description, link, userOnline }) {
    await postRepositories.createPost({ title, description, link, userOnline });
}

export const postServices = {
    createPost,
}