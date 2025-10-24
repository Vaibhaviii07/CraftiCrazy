import { Router } from "express";
import orderRoutes from "./order.route";
import authRoutes from "./auth.route";

const router = Router();

// Mount product routes
router.use("/order",orderRoutes);
router.use("/auth",authRoutes);

export default router;
