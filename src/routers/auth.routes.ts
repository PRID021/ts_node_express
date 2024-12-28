import express from "express";

import {
  changePassword,
  forgotPassword,
  logout,
  refresh,
  signIn,
  signUp,
  verifyEmail,
} from "@controllers/auth.controller";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/verify-email", verifyEmail);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

export default router;
