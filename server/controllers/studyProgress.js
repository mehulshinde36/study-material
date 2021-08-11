import StudyProgress from "../models/studyProgress.js";

export const getStudyMaterialProgress = async (req, res) => {
  const { materialId } = req.params;
  const { userEmail } = req.params;

  try {
    let serchObj = {
      studyMaterialId: null,
      userEmailId: "",
    };
    if (materialId && materialId !== "" && materialId !== "null") {
      serchObj.studyMaterialId = materialId;
    }
    if (userEmail && userEmail !== "") {
      serchObj.userEmailId = userEmail;
    }
    const studyProgress = await StudyProgress.findOne(serchObj);
    if (studyProgress) {
      res.status(200).json(studyProgress);
    } else {
      res.status(200).json({ message: "study progress not found" });
    }
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const getAllStudyMaterialProgress = async (req, res) => {
  const { userEmail } = req.params;

  try {
    let serchObj = {
      userEmailId: "",
    };
    if (userEmail && userEmail !== "") {
      serchObj.userEmailId = userEmail;
    }
    const studyProgress = await StudyProgress.find(serchObj);
    if (studyProgress) {
      res.status(200).json(studyProgress);
    } else {
      res.status(200).json({ message: "study progress not found" });
    }
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const setStudyMaterialProgress = async (req, res) => {
  const studyProgress = req.body;
  try {
    const newStudyProgress = new StudyProgress(studyProgress);

    let studyReturnObj = await newStudyProgress.save();

    res.status(201).json(studyReturnObj);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateStudyProgress = async (req, res) => {
  const studyProgress = req.body;
  try {
    const progress = await StudyProgress.findById(studyProgress._id);

    if (progress) {
      progress.timeForCompletion = studyProgress.timeForCompletion;
      var studyReturnObj = await progress.save();
    }

    res.status(201).json(studyReturnObj);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
