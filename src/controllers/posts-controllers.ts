import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { errorHandler } from '../middlewares/error-handler-middlware.js';
import { ApplicationError, CheckId, NewPost } from '../utils/protocols.js';
import { postSchema } from '../schemas/posts-schema.js';
import { postServices } from '../services/posts-services.js';
import { userServices } from '../services/users-services.js';

async function newPost(req: Request, res: Response) {
    const post = req.body as NewPost;
    const userToken = res.locals.user;

    const { error } = postSchema.validate(post)
    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });

    const { title, description, link } = req.body;

    try { 
        const userId = await userServices.retrieveSession(userToken)
        if (!userId) return res.status(httpStatus.UNAUTHORIZED);

        const result = await postServices.createPost({ title, description, link, userId });
        return res.status(httpStatus.CREATED).send({ result });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function deletePost(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;

    try {
        const postExists = await postServices.getPostById(id);
        if (!postExists) return res.status(httpStatus.BAD_REQUEST).send("Post does not exist");

        const userId = await userServices.retrieveSession(userToken)
        if (postExists.userId !== userId.userId) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request")

        await postServices.deletePost(id);
        return res.status(httpStatus.OK).send("Post deleted")
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function updatePost(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;
    const post = req.body as NewPost;

    const { error } = postSchema.validate(post)
    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });

    const { title, description, link } = req.body;

    try {
        const postExists = await postServices.getPostById(id);
        if (!postExists) return res.status(httpStatus.BAD_REQUEST).send("Post does not exist");

        const userId = await userServices.retrieveSession(userToken)
        if (postExists.userId !== userId.userId) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request")

        const result = await postServices.updatePost({ title, description, link, id });
        return res.status(httpStatus.OK).send({ result })
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function getPosts(req: Request, res: Response) {
    try {
        const posts = await postServices.getPosts();
        return res.status(httpStatus.OK).send({ posts });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
}

async function getPostsByUserId(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;

    try {
        const token = await userServices.retrieveSession(userToken);
        const userId = await userServices.retrieveUserById(id)
        if (userId.id !== token.id) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request")

        const userPosts = await postServices.getPostsByUserId(id);
        return res.status(httpStatus.OK).send({ userPosts });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
}

export const postControllers = {
    newPost,
    getPosts,
    getPostsByUserId,
    deletePost,
    updatePost,
}