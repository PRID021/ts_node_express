import express from "express";

import { getFeaturings } from "@controllers/landing.controller";

const router = express.Router();

router.get("/featurings", getFeaturings);

export default router;
