import { Router } from "express";
import { userControllers } from '../controllers/users-controllers.js';

const userRoutes = Router();

userRoutes.post("/register", userControllers.register);

export default userRoutes;
