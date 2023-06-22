import { Router } from "express";
import { userControllers } from '../controllers/users-controllers';
import { authValidate } from "../middlewares/auth-validation";

const userRoutes = Router();

userRoutes.post("/register", userControllers.register);
userRoutes.post("/login", userControllers.login);
userRoutes.get("/users", userControllers.getUsers);
userRoutes.delete("/users/:id", authValidate, userControllers.deleteUser);

export default userRoutes;
