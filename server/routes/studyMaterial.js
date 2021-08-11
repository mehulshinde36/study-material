import express from "express";

import {
  getStudyMaterial,
  getStudyMaterialById,
} from "../controllers/studyMaterial.js";

const router = express.Router();

router.get("/getStudyMaterial", getStudyMaterial);

router.get("/getStudyMaterialById/:materialId", getStudyMaterialById);

export default router;
