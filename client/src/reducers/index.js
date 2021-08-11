import { combineReducers } from "redux";
import { user } from "./user";
import { studyMaterial } from "./studyMaterial";
import { studyProgress } from "./studyProgress";

export default combineReducers({ user, studyMaterial, studyProgress });
