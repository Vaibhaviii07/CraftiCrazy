import express from "express";
import { createDemandController,uploadMiddleware } from "../controllers/demand.controller";


const router = express.Router();

router.post("/create",uploadMiddleware,createDemandController);

export default router;