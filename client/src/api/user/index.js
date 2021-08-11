import axios from "axios";
import { url } from "../index.js";

export const createUser = (newUser) =>
  axios.post(url + "user/" + "createUser", newUser);
