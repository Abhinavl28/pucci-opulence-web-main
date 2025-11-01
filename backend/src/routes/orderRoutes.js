import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;

