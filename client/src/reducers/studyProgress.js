export const studyProgress = (studyProgress = null, action) => {
  switch (action.type) {
    case "STUDY_PROGRESS":
      return {
        ...studyProgress,
        studyProgress: action.payload,
      };
    case "ALL_STUDY_PROGRESS":
      return {
        ...studyProgress,
        allStudyProgress: action.payload,
      };
    case "SET_STUDY_PROGRESS":
      return {
        ...studyProgress,
        setStudyProgress: action.payload,
      };
    case "UPDATE_STUDY_PROGRESS":
      return {
        ...studyProgress,
        updateStudyProgress: action.payload,
      };

    default:
      return studyProgress;
  }
};
