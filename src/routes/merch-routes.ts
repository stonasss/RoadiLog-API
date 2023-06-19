import { Router } from 'express';
import { authValidate } from '../middlewares/auth-validation.js';
import { merchControllers } from '../controllers/merch-controllers.js';

const merchRoutes = Router();

merchRoutes.get("/", merchControllers.getMerch);
merchRoutes.get("/:id", merchControllers.getMerchByUserId)
merchRoutes.post("/new", authValidate, merchControllers.newMerch);
merchRoutes.put("/:id", authValidate, merchControllers.updateMerch);
merchRoutes.delete("/:id", authValidate, merchControllers.deleteMerch);

export default merchRoutes;
