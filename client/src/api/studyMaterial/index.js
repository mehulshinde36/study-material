import axios from "axios";
import { url } from "../index.js";

export const getStudyMaterials = () =>
  axios.get(url + "studyMaterial/" + "getStudyMaterial");

export const getStudyMaterialById = (materialId) =>
  axios.get(url + "studyMaterial/getStudyMaterialById/" + materialId);
