import httpStatus from "http-status";
import { errors } from "../errors/index.js";
import { postRepositories } from "../repositories/posts-repositories.js";

async function createPost({ title, description, link, userId }) {
    const post = await postRepositories.createPost({ title, description, link, userId });
    return post;
};

async function deletePost(id: string) {
    const postId = parseInt(id)
    const post = await postRepositories.deletePost(postId);
    return post;
};

async function getPostById(id: string) {
    const postId = parseInt(id)
    const post = await postRepositories.getPostById(postId);
    return post;
}

async function getPosts() {
    const result = await postRepositories.getPosts();
    return result;
};

export const postServices = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
};
