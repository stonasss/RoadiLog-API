import { Router } from "express";
import userRoutes from "./users-routes.js";

const router = Router();

router.use("/", userRoutes)

export default router;
