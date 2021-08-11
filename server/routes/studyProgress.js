import express from "express";

import {
  getStudyMaterialProgress,
  setStudyMaterialProgress,
  updateStudyProgress,
  getAllStudyMaterialProgress,
} from "../controllers/studyProgress.js";

const router = express.Router();

router.get(
  "/getStudyMaterialProgress/:materialId/:userEmail",
  getStudyMaterialProgress
);

router.get(
  "/getAllStudyMaterialProgress/:userEmail",
  getAllStudyMaterialProgress
);

router.post("/setStudyMaterialProgress", setStudyMaterialProgress);

router.post("/updateStudyProgress", updateStudyProgress);

export default router;
