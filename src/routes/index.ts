import { Router } from "express";
import userRoutes from "./users-routes.js";
import postRoutes from "./posts-routes.js";

const router = Router();

router
    .use("/", userRoutes)
    .use("/posts", postRoutes)

export default router;
