import { errors } from '../errors/index';
import { merchRepositories } from '../repositories/merch-repositories';

async function createMerch({ image, title, price, userId }: any) {
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

async function getMerchByUserId(id: string) {
    const userId = parseInt(id);
    const userMerch = await merchRepositories.getMerchByUser(userId);
    return userMerch;
}

async function updateMerch({ image, title, price, id }: any) {
    const merchId = parseInt(id)
    const merch = await merchRepositories.updateMerch({ image, title, price, merchId });
    return merch;
};

export const merchServices = {
    createMerch,
    getMerch,
    getMerchById,
    getMerchByUserId,
    updateMerch,
    deleteMerch,
};
