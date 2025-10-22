import { Router } from "express";
import orderRoutes from "./order.route";

const router = Router();

// Mount product routes
router.use("/order",orderRoutes);

export default router;
