import prisma from "../config/database";
import { EditPost, ValidPost } from "../utils/protocols";

async function createPost({ title, description, link, userId }: ValidPost) {
    return prisma.posts.create({
        data: {
            userId,
            title,
            description,
            link,
        },
    });
}

async function getPosts() {
    return prisma.posts.findMany();
}

async function getPostById(postId: number) {
    return prisma.posts.findFirst({
        where: {
            id: postId,
        },
    });
}

async function deletePost(postId: number) {
    return prisma.posts.delete({
        where: {
            id: postId,
        },
    });
}

async function updatePost({ title, description, link, postId }: EditPost) {
    return prisma.posts.update({
        where: {
            id: postId,
        },
        data: {
            title,
            description,
            link,
        },
    });
}

async function getPostsByUser(userId: number) {
    return prisma.posts.findMany({
        where: {
            userId,
        },
    });
}

export const postRepositories = {
    createPost,
    getPosts,
    getPostById,
    getPostsByUser,
    deletePost,
    updatePost,
};
