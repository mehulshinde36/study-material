import * as api from "../api/user";

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({ type: "CREATE_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
