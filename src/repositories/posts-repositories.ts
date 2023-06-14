import prisma from "../config/database";
import { NewPost } from "../utils/protocols";

async function createPost({ title, description, link, userOnline }: NewPost) {
    return prisma.posts.create({
        where: {
            user_id: userOnline
        }
        data: {
            title,
            description,
            link,
        },
    });
};

export const postRepositories = {
    createPost,
}