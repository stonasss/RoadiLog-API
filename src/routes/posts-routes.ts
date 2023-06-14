import { Router } from 'express';
import { postControllers } from '../controllers/posts-controllers.js';

const postRoutes = Router();

postRoutes.post("/new", postControllers.newPost);

export default postRoutes;
