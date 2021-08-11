import axios from "axios";
import { url } from "../index.js";

export const getStudyMaterialProgress = (studyMaterialId, userEmail) =>
  axios.get(
    url +
      "studyProgress/" +
      "getStudyMaterialProgress/" +
      studyMaterialId +
      "/" +
      userEmail
  );

export const getAllStudyMaterialProgress = (userEmail) =>
  axios.get(
    url + "studyProgress/" + "getAllStudyMaterialProgress/" + userEmail
  );

export const setStudyMaterialProgress = (studyProgress) =>
  axios.post(
    url + "studyProgress/" + "setStudyMaterialProgress",
    studyProgress
  );

export const updateStudyProgress = (studyProgress) =>
  axios.post(url + "studyProgress/" + "updateStudyProgress", studyProgress);
