import prisma from "../config/database.js";
import { ValidMerch } from "../utils/protocols";

async function createMerch({ image, title, price, userId }: ValidMerch) {
    return prisma.merch.create({
        data: {
            userId,
            image,
            title,
            price,
        },
    });
};

async function getMerch() {
    return prisma.merch.findMany();
};

export const merchRepositories = {
    createMerch,
    getMerch,
};
