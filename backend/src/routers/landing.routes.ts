import express from "express";

import {
  getCourseModule,
  getFeaturings,
} from "@controllers/landing.controller";

const router = express.Router();

router.get("/featurings", getFeaturings);
router.get("/course-module", getCourseModule);

export default router;
