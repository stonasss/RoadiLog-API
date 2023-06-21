import { errors } from "../errors/index";
import { postRepositories } from "../repositories/posts-repositories";

async function createPost({ title, description, link, userId }: any) {
    const post = await postRepositories.createPost({ title, description, link, userId });
    return post;
};

async function deletePost(id: string) {
    const postId = parseInt(id)

    const post = await postRepositories.getPostById(postId);
    if (!post) throw errors.notFoundError();

    const result = await postRepositories.deletePost(postId);
    return result;
};

async function updatePost({ title, description, link, id }: any) {
    const postId = parseInt(id)
    const post = await postRepositories.updatePost({ title, description, link, postId });
    return post;
};

async function getPostById(id: string) {
    const postId = parseInt(id)
    const post = await postRepositories.getPostById(postId);

    if (!post) throw errors.notFoundError();
    return post;
};

async function getPostsByUserId(id: string) {
    const userId = parseInt(id);
    const userPosts = await postRepositories.getPostsByUser(userId);
    return userPosts;
};

async function getPosts() {
    const result = await postRepositories.getPosts();
    return result;
};

export const postServices = {
    createPost,
    getPosts,
    getPostById,
    getPostsByUserId,
    deletePost,
    updatePost,
};
