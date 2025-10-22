import {Router} from "express";
import * as orderCtrl from "../controllers/order.controller";

const router = Router();
router.post("/createOrder", orderCtrl.createOrder);
router.post("/orderComplete",orderCtrl.completeOrder);

export default router;