import express from "express";

import { getUserProfile, upFile } from "@controllers/user.controller";
import { upload } from "@middlewares/storage_middleware";

const router = express.Router();

router.get("/", getUserProfile);
router.post("/upload", upload.single("file"), upFile);

export default router;
