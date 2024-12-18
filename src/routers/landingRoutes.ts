import express from "express";

import { greeting } from "@controllers/landingController";

const router = express.Router();

router.get("/", greeting);

export default router;