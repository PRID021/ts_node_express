import express from "express";

import { getPosts } from "@controllers/landingController";

const router = express.Router();

router.get("/", getPosts);

export default router;
