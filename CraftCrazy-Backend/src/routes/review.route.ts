// src/routes/review.routes.ts
import express from "express";
import * as reviewCtrl from "../controllers/review.controller";

const router = express.Router();

router.post("/add",reviewCtrl.addReviewController);
router.get("/product/:id", reviewCtrl.getReviewsByProductController); // fix
router.delete("/:reviewId", reviewCtrl.deleteReviewController);

export default router;
