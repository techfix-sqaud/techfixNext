"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "@/components/helpers/Alert";
import Link from "next/link";
import useLogin from "@/components/hooks/useLogin";

const SignIn: React.FC = () => {
  const { requestLogin } = useLogin();
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

              <div className="black dark:white">Sign in with your email</div>
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
                    className="block black text-sm font-medium mb-1 dark:white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full black pr-10 dark:white"
                      placeholder="you@yourcompany.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      <FaEnvelope className="text-gray-500" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block black text-sm font-medium mb-1 dark:white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      className="form-input w-full black pr-10 dark:white"
                      placeholder="Password (at least 10 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </span>
                  </div>
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
                      <span className="black dark:white">Remember me</span>
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
            <div className="black dark:white text-center mt-6">
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
