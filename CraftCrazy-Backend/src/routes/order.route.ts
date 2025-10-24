import {Router} from "express";
import * as orderCtrl from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/createOrder",authMiddleware, orderCtrl.createOrder);
router.post("/orderComplete",authMiddleware, orderCtrl.completeOrder);

export default router;