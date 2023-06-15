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

export const postRepositories = {
    createPost,
    getPosts,
}