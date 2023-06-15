import prisma from "../config/database.js";
import { ValidMerch, EditMerch } from "../utils/protocols";

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

async function deleteMerch(merchId: number) {
    return prisma.merch.delete({
        where: {
            id: merchId,
        },
    });
};

async function updateMerch({ image, title, price, merchId }: EditMerch) {
    return prisma.merch.update({
        where: {
            id: merchId,
        },
        data: {
            image,
            title,
            price,
        },
    });
};

async function getMerch() {
    return prisma.merch.findMany();
};

async function getMerchById(merchId: number) {
    return prisma.merch.findFirst({
        where: {
            id: merchId,
        },
    });
};

export const merchRepositories = {
    createMerch,
    getMerch,
    getMerchById,
    updateMerch,
    deleteMerch,
};
