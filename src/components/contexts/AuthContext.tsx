"use client";
import React, { createContext, useReducer } from "react";
import { authReducer, initialState } from "./AuthProvider";
import { AuthAction, IUserProfile } from "./types/UserProfile";

// Define the shape of your context value
interface AuthContextType {
  userProfile: IUserProfile;
  dispatch: React.Dispatch<AuthAction>;
}

// Create context without a default dispatch
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userProfile, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ userProfile, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
