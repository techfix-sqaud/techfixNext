"use client";
import TechFixAPI from "@/components/helpers/techfixAPI";
import Alert from "@/components/helpers/Alert";
import Link from "next/link";
import { useState } from "react";
export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleForgotPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await TechFixAPI.get(
        `Users/forgot-password?email=${email}`
      );
      if (response.status === 200) {
        setIsEmailSent(true);
        setEmail("");
      } else {
        setIsEmailSent(false);
      }
    } catch (error) {
      console.log(error);
      setIsEmailSent(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">Forgot your password?</h1>
            <p className="text-xl text-gray-400">
              We will email you instructions on how to reset it.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            {isEmailSent && (
              <Alert type="success" message="Password email reset sent" />
            )}
            <form onSubmit={handleForgotPassword}>
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
                    placeholder="email@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    className="btn text-white bg-blue-600 hover:bg-gray-700 w-full"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              <Link
                href="/signin"
                className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
