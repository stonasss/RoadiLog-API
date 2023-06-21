import { Router } from "express";
import userRoutes from "./users-routes";
import postRoutes from "./posts-routes";
import projectRoutes from "./projects-routes";
import merchRoutes from "./merch-routes";

const router = Router();

router
    .use("/", userRoutes)
    .use("/posts", postRoutes)
    .use("/projects", projectRoutes)
    .use("/merch", merchRoutes)

export default router;
