"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/components/contexts/AuthContext";
import TechFixAPI, {
  configartion,
  resetConfigartion,
} from "@/components/helpers/techfixAPI";
import { toast } from "react-toastify";
import useLocalStorage from "./useLocalStorage";

const useLogin = () => {
  const { userProfile, dispatch } = useContext(AuthContext)!;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useLocalStorage("token", "");
  const [expires, setExpires] = useLocalStorage("expires", null);
  const [rememberMe, setRememberMe] = useLocalStorage("rememberMe", null);

  useEffect(() => {
    if (!userProfile.isAuthenticated && token && expires) {
      const expirationDate = new Date(expires);
      handleLogin(token, expirationDate, false);
    }
    setLoading(false);
  }, [dispatch, token, expires]);

  const handleLogin = async (
    token: string,
    expires: Date,
    redirect: boolean
  ) => {
    if (token && expires) {
      configartion(token);
      try {
        const response = await TechFixAPI.get("/Users/profile");
        const user = response.data;
        setExpires(expires);
        dispatch({
          type: "LOGIN",
          payload: {
            isAuthenticated: true,
            userId: user.id,
            role: user.role,
            profile: user.profile,
            firstName: user.firstName,
            lastName: user.last_name,
            token: token,
            expires: expires,
          },
        });
        if (rememberMe) {
          setRememberMe(rememberMe);
        }
        if (redirect) {
          navigateBasedOnRole(user.role);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    } else {
      handleLogout();
      toast.error("Your session has expired. Please log in again.", {
        autoClose: false,
      });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    resetConfigartion();
    dispatch({ type: "LOGOUT" });
    setToken("");
    setExpires(null);
    if (rememberMe) {
      setRememberMe(rememberMe);
    }
    router.push("/signin");
  };

  const requestLogin = async (
    email: string,
    password: string,
    rememberMe: boolean,
    setErrorMessage: (message: string) => void
  ) => {
    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    try {
      const response = await TechFixAPI.post("Authentication/login", {
        EmailOrNumber: email,
        Password: password,
      });
      if (response) {
        const token = response.data;
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 8);
        setToken(token);
        setExpires(expirationDate);
        handleLogin(token, expirationDate, true);
      }
    } catch (error) {
      setErrorMessage(
        "Invalid credentials. Please check your username and password and try again."
      );
    }
  };

  const navigateBasedOnRole = (role: string) => {
    switch (role) {
      case "ADMIN":
        router.push("/admin");
        break;
      case "EMPLOYEE":
        router.push("/sales/pos");
        break;
      default:
        router.push("/");
        break;
    }
  };

  return { loading, requestLogin, handleLogin, handleLogout };
};

export default useLogin;
