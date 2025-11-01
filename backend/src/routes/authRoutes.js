import express from "express";
import { signUp, signIn, getProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/profile", authMiddleware, getProfile);

export default router;

