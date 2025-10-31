import { Router } from "express";
import orderRoutes from "./order.route";
import authRoutes from "./auth.route";
import contactRoutes from "./contact.route";
import demandRoutes from "./demand.route";
import productRoutes from "./product.route"; 

const router = Router();

router.use("/order", orderRoutes);
router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
router.use("/demand", demandRoutes);
router.use("/products", productRoutes); 

export default router;
