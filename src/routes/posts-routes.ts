import { Router } from 'express';
import { postControllers } from '../controllers/posts-controllers.js';
import { authValidate } from '../middlewares/auth-validation.js';

const postRoutes = Router();

postRoutes.post("/new", postControllers.newPost);
postRoutes.get("/", postControllers.getPosts);

export default postRoutes;
