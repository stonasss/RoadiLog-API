import prisma from "../config/database.js";
import { NewPost } from "../utils/protocols.js";

async function createPost({ title, description, link, userOnline }: NewPost) {
    return prisma.posts.create({
        data: {
            user_id: userOnline,
            title,
            description,
            link,
        },
    });
};

export const postRepositories = {
    createPost,
}