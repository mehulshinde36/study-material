export const user = (user = null, action) => {
  switch (action.type) {
    case "SET_LOGGEDIN_USER":
      return {
        ...user,
        loggedInUser: action.payload,
      };
    default:
      return user;
  }
};
