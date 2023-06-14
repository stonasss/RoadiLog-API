import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { errorHandler } from '../middlewares/error-handler-middlware';
import { ApplicationError, NewPost } from '../utils/protocols';
import { postSchema } from '../schemas/posts-schema';
import { postServices } from '../services/posts-services';
import { userServices } from '../services/users-services';

async function newPost(req: Request, res: Response) {
    const post = req.body as NewPost;
    const { error } = postSchema.validate(post)

    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    const {title, description, link, token} = req.body;

    try { 
        const userOnline = await userServices.retrieveId(token)
        if (!userOnline) return res.status(httpStatus.UNAUTHORIZED);

        await postServices.createPost({ title, description, link, userOnline });
        res.status(httpStatus.CREATED).send({});
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

export const postControllers = {
    newPost,
}