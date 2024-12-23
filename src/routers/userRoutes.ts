import express from "express";

import { getUserProfile, upFile } from "@controllers/userController";
import { upload } from "@middlewares/storageMiddleware";

const router = express.Router();

router.get("/", getUserProfile);
router.post("/upload", upload.single("file"), upFile);

export default router;
