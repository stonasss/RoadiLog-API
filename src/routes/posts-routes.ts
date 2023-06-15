import { Router } from 'express';
import { postControllers } from '../controllers/posts-controllers.js';
import { authValidate } from '../middlewares/auth-validation.js';

const postRoutes = Router();

postRoutes.post("/new", authValidate, postControllers.newPost);
postRoutes.get("/", postControllers.getPosts);
postRoutes.put("/:id", authValidate, postControllers.updatePost);
postRoutes.delete("/:id", authValidate, postControllers.deletePost);

export default postRoutes;
