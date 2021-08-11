export const studyMaterial = (studyMaterial = null, action) => {
  switch (action.type) {
    case "STUDY_MATERIALS":
      return {
        ...studyMaterial,
        studyMaterialList: action.payload,
      };
    case "SELECTED_MATERIAL":
      return {
        ...studyMaterial,
        selectedStudyMaterial: action.payload,
      };
    default:
      return studyMaterial;
  }
};
