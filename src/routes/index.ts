import { Router } from "express";
import userRoutes from "./users-routes";

const router = Router();

router.use("/", userRoutes)

export default router;
