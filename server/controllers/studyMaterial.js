import StudyMaterial from "../models/studyMaterial.js";

export const getStudyMaterial = async (req, res) => {
  try {
    const studyMaterial = await StudyMaterial.find();

    if (studyMaterial) {
      res.status(201).json(studyMaterial);
    } else {
      res.status(404).json({ error: "study material not found" });
    }
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const getStudyMaterialById = async (req, res) => {
  const { materialId } = req.params;
  try {
    const studyMaterial = await StudyMaterial.findById(materialId);

    if (studyMaterial) {
      res.status(201).json(studyMaterial);
    } else {
      res.status(404).json({ error: "study material not found" });
    }
  } catch (error) {
    res.status(409).json({ error });
  }
};
