import * as api from "../api/studyMaterial";

export const getStudyMaterials = () => async (dispatch) => {
  try {
    const { data } = await api.getStudyMaterials();
    dispatch({ type: "STUDY_MATERIALS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getStudyMaterialById = (materialId) => async (dispatch) => {
  try {
    const { data } = await api.getStudyMaterialById(materialId);
    dispatch({ type: "SELECTED_MATERIAL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
