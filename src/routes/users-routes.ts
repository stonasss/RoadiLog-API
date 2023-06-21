import { Router } from "express";
import { userControllers } from '../controllers/users-controllers';

const userRoutes = Router();

userRoutes.post("/register", userControllers.register);
userRoutes.post("/login", userControllers.login);
userRoutes.get("/users", userControllers.getUsers);
userRoutes.delete("/users", userControllers.deleteUser);

export default userRoutes;
