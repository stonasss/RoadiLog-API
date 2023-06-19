import { Router } from 'express';
import { projectControllers } from '../controllers/projects-controllers.js';
import { authValidate } from '../middlewares/auth-validation.js';

const projectRoutes = Router();

projectRoutes.get("/", projectControllers.getProjects);
projectRoutes.get("/:id", projectControllers.getProjectsByUserId)
projectRoutes.post("/new", authValidate, projectControllers.newProject);
projectRoutes.put("/:id", authValidate, projectControllers.updateProject);
projectRoutes.delete("/:id", authValidate, projectControllers.deleteProject);

export default projectRoutes;
