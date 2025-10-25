import { Router } from "express";
import orderRoutes from "./order.route";
import authRoutes from "./auth.route";
import contactRoutes from "./contact.route";

const router = Router();

// Mount product routes
router.use("/order",orderRoutes);
router.use("/auth",authRoutes);
router.use("/contact",contactRoutes);

export default router;
