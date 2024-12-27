import express from "express";

import { logout, refresh, signIn, signUp, verifyEmail } from "@controllers/auth.controller";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/verify-email", verifyEmail)
router.post("/sign-in", signIn);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
