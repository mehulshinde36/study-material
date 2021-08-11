import * as api from "../api/studyProgress";

export const getStudyMaterialProgress =
  (studyMaterialId, userEmail) => async (dispatch) => {
    try {
      const { data } = await api.getStudyMaterialProgress(
        studyMaterialId,
        userEmail
      );
      dispatch({ type: "STUDY_PROGRESS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getAllStudyMaterialProgress = (userEmail) => async (dispatch) => {
  try {
    const { data } = await api.getAllStudyMaterialProgress(userEmail);
    dispatch({ type: "ALL_STUDY_PROGRESS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setStudyMaterialProgress = (studyProgress) => async (dispatch) => {
  try {
    const { data } = await api.setStudyMaterialProgress(studyProgress);
    dispatch({ type: "SET_STUDY_PROGRESS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudyProgress = (progress) => async (dispatch) => {
  try {
    const { data } = await api.updateStudyProgress(progress);
    dispatch({ type: "UPDATE_STUDY_PROGRESS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
