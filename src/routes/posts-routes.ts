import { Router } from 'express';
import { postControllers } from '../controllers/posts-controllers';
import { authValidate } from '../middlewares/auth-validation';

const postRoutes = Router();

postRoutes.get("/", postControllers.getPosts);
postRoutes.get("/:id", postControllers.getPostsByUserId)
postRoutes.post("/new", authValidate, postControllers.newPost);
postRoutes.put("/:id", authValidate, postControllers.updatePost);
postRoutes.delete("/:id", authValidate, postControllers.deletePost);

export default postRoutes;
