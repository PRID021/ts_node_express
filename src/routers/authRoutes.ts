import express from "express";

import { logout, refresh, signIn, signUp } from "@controllers/authController";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
