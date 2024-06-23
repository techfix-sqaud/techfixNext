"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Alert from "@/components/helpers/Alert";
import Link from "next/link";
import useLogin from "@/components/hooks/useLogin";

const SignIn: React.FC = () => {
  const { requestLogin, handleLogout } = useLogin();
  const [greeting, setGreeting] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    function greet() {
      const currentHour = new Date().getHours();

      switch (true) {
        case currentHour >= 5 && currentHour < 12:
          setGreeting("Good morning!");
          break;
        case currentHour >= 12 && currentHour < 17:
          setGreeting("Hello!");
          break;
        case currentHour >= 17 && currentHour < 20:
          setGreeting("Good afternoon!");
          break;
        default:
          setGreeting("Good evening!");
      }
    }

    greet();
  }, []);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestLogin(email, password, rememberMe, setErrorMessage);
  };

  // useEffect(() => {
  //   const rememberMeStored = window.localStorage.getItem("rememberMe");
  //   const storedEmail = window.localStorage.getItem("email");

  //   if (rememberMeStored) {
  //     const emailWithoutQuotes = storedEmail?.replace(/"/g, "");
  //     setEmail(emailWithoutQuotes || "");
  //     setRememberMe(true);
  //   }
  // }, []);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">{greeting}</h1>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-700 border-dotted grow mr-3"
                aria-hidden="true"
              ></div>

              <div className="text-gray-400">Sign in with your email</div>
              <div
                className="border-t border-gray-700 border-dotted grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            {errorMessage && <Alert type="error" message={errorMessage} />}
            <form onSubmit={onSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-gray-300"
                    placeholder="you@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    className="form-input w-full text-gray-300"
                    placeholder="Password (at least 10 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="text-gray-400 ml-2">Remember me</span>
                    </label>
                    <Link
                      href="/reset-password"
                      className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
