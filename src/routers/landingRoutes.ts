import express from "express";

import { greeting, testPost } from "@controllers/landingController";

const router = express.Router();

router.get("/", greeting);
router.post("/", testPost);


export default router;