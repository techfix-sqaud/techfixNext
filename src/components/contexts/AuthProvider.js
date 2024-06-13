export const initialState = {
  isAuthenticated: false,
  userId: null,
  role: null,
  profile: "",
  firstName: "",
  lastName: "",
  token: "",
  expires: null,
};

export const authReducer = (UserState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...UserState,
        isAuthenticated: true,
        userId: action.payload.userId,
        role: action.payload.role,
        profile: action.payload.profile,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        token: action.payload.token,
        expires: action.payload.expires,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        userId: null,
        role: null,
        profile: "",
        firstName: "",
        lastName: "",
        token: "",
        expires: null,
      };
    default:
      return UserState;
  }
};
