import express from "express";

import { createUser, authenticateUser, refreshAccessToken } from "@controllers/authController";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/sign-in", authenticateUser);
router.post("/refresh", refreshAccessToken);

export default router;