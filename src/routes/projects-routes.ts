import { Router } from 'express';
import { projectControllers } from '../controllers/projects-controllers.js';
import { authValidate } from '../middlewares/auth-validation.js';

const projectRoutes = Router();

projectRoutes.post("/new", authValidate, projectControllers.newProject);

export default projectRoutes;
