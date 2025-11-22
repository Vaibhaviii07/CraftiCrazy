import express from "express";
import * as productCtrl from "../controllers/product.controller";

const router = express.Router();

router.post("/add",productCtrl.uploadMiddleware, productCtrl.createProductController);


router.get("/", productCtrl.getFilteredProducts);

router.get("/newarrivals", productCtrl.getAllProdutsController);
router.get("/:id", productCtrl.getProductByIdController);
router.put("/:id", productCtrl.updateProductController);
router.delete("/:id", productCtrl.deleteProductController);

export default router;
