import { Router } from 'express';
import { authValidate } from '../middlewares/auth-validation';
import { merchControllers } from '../controllers/merch-controllers';

const merchRoutes = Router();

merchRoutes.get("/", merchControllers.getMerch);
merchRoutes.get("/:id", merchControllers.getMerchByUserId)
merchRoutes.post("/new", authValidate, merchControllers.newMerch);
merchRoutes.put("/:id", authValidate, merchControllers.updateMerch);
merchRoutes.delete("/:id", authValidate, merchControllers.deleteMerch);

export default merchRoutes;
