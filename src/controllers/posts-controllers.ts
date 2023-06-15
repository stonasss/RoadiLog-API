import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { errorHandler } from '../middlewares/error-handler-middlware.js';
import { ApplicationError, NewPost } from '../utils/protocols.js';
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
        const userOnline = await userServices.retrieveSession(userToken)
        if (!userOnline) return res.status(httpStatus.UNAUTHORIZED);

        await postServices.createPost({ title, description, link, userToken });
        res.status(httpStatus.CREATED).send({});
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

export const postControllers = {
    newPost,
    getPosts,
}