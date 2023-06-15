import { errors } from '../errors/index.js';
import { merchRepositories } from '../repositories/merch-repositories.js';

async function createMerch({ image, title, price, userId }) {
    const merch = await merchRepositories.createMerch({ image, title, price, userId });
    return merch;
};

async function getMerch() {
    const result = await merchRepositories.getMerch();
    return result;
}

export const merchServices = {
    createMerch,
    getMerch,
}