import express from "express";

import {
  getCourseModule,
  getFeaturings,
  getLearningStyles,
} from "@controllers/landing.controller";

const router = express.Router();

router.get("/featurings", getFeaturings);
router.get("/course-module", getCourseModule);

router.get("/learning-styles", getLearningStyles);

export default router;
