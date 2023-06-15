import { Router } from "express";
import userRoutes from "./users-routes.js";
import postRoutes from "./posts-routes.js";
import projectRoutes from "./projects-routes.js";
import merchRoutes from "./merch-routes.js";

const router = Router();

router
    .use("/", userRoutes)
    .use("/posts", postRoutes)
    .use("/projects", projectRoutes)
    .use("/merch", merchRoutes)

export default router;
