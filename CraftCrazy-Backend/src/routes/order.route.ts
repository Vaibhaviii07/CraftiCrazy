import {Router} from "express";
import * as orderCtrl from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/addmin.middleware";

const router = Router();
router.post("/createOrder",authMiddleware, orderCtrl.createOrder);
router.post("/orderComplete",authMiddleware, orderCtrl.completeOrder);

//admin routes
router.get("/order",authMiddleware,adminMiddleware,orderCtrl.getAllOrders);
router.patch("/order/:orderId",authMiddleware,adminMiddleware,orderCtrl.updateOrderStatus);

export default router;