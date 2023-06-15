import { errors } from '../errors/index.js';
import { merchRepositories } from '../repositories/merch-repositories.js';

async function createMerch({ image, title, price, userId }) {
    const merch = await merchRepositories.createMerch({ image, title, price, userId });
    return merch;
};

async function deleteMerch(id: string) {
    const merchId = parseInt(id);

    const merch = await merchRepositories.getMerchById(merchId);
    if (!merch) throw errors.notFoundError();

    const result = await merchRepositories.deleteMerch(merchId);
    return result;
}

async function getMerchById(id: string) {
    const merchId = parseInt(id);
    const merch = await merchRepositories.getMerchById(merchId);

    if (!merch) throw errors.notFoundError();
    return merch;
};

async function getMerch() {
    const result = await merchRepositories.getMerch();
    return result;
};

async function updateMerch({ image, title, price, id }) {
    const merchId = parseInt(id)
    const merch = await merchRepositories.updateMerch({ image, title, price, merchId });
    return merch;
}

export const merchServices = {
    createMerch,
    getMerch,
    getMerchById,
    updateMerch,
    deleteMerch,
}