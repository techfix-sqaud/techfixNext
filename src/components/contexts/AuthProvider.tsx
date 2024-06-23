"use client"
import { AuthAction, IUserProfile } from "./types/UserProfile";

// Initial state definition
export const initialState: IUserProfile = {
  isAuthenticated: false,
  userId: null,
  role: null,
  profile: "",
  firstName: "",
  lastName: "",
  token: "",
  expires: null,
};

export const authReducer = (
  state: IUserProfile,
  action: AuthAction
): IUserProfile => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
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
      return initialState;
    default:
      return state;
  }
};
