import prisma from "../config/database.js";
import { ValidPost } from "../utils/protocols.js";

async function createPost({ title, description, link, userId }: ValidPost) {
    return prisma.posts.create({
        data: {
            userId,
            title,
            description,
            link,
        },
    });
};

async function getPosts() {
    return prisma.posts.findMany();
};

async function getPostById(postId: number) {
    return prisma.posts.findFirst({
        where: {
            id: postId,
        }
    })
}

async function deletePost(postId: number) {
    return prisma.posts.delete({
        where: {
            id: postId,
        }
    })
}

export const postRepositories = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
}