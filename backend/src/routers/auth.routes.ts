import express from "express";
import {
  authenticate,
  changePassword,
  forgotPassword,
  logout,
  signIn,
  signUp,
  verifyEmail,
} from "@controllers/auth.controller";
import { authMiddleware } from "@middlewares/auth_middleware";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/authenticate", authenticate);
router.post("/sign-up", signUp);
router.post("/verify-email", verifyEmail);
router.post("/logout", authMiddleware, logout);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

export default router;
