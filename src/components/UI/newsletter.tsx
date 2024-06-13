"use client";

import { useRef, useState } from "react";
import { _subscriber, sendConfirmationEmail } from "../API/generalServices";

export default function Newsletter() {
  const subscriberEmail = useRef<HTMLInputElement>(null); // Define useRef with HTMLInputElement type
  const [confirmationSubject, setConfirmationSubject] = useState(
    "Thanks for signing up!"
  );
  const [confirmationMessage, setConfirmationMessage] = useState(
    "Hello! You are now officially subscribed to our newsletter.We're thrilled to have you as the newest member to our online community.Here's what you can expect: news, special offers just for you, event info, updates and more. And, as a thank you for joining, please enjoy 10% off your next purchase online! We've generated a unique promo code for you, check your email. To redeem,  or stop by our store."
  );

  const resetForm = () => {
    if (subscriberEmail.current) {
      subscriberEmail.current.value = "";
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const email = subscriberEmail.current?.value;
      if (email) {
        await _subscriber(email);

        // If subscription succeeds, send confirmation email
        await sendConfirmationEmail(
          email,
          confirmationSubject,
          confirmationMessage
        );

        alert(
          "We have sent you a confirmation email. If you don't find it, please check your spam folder."
        );
        resetForm();
      }
    } catch (error) {
      alert("Email subscription failed: " + error);
      resetForm();
    }
  };
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* CTA box */}
            <div
              className="relative bg-blue-600 py-10 px-8 md:py-16 md:px-12"
              data-aos="fade-up"
            >
              {/* Background illustration */}
              <div
                className="absolute right-0 top-0 -ml-40 pointer-events-none"
                aria-hidden="true"
              >
                <svg
                  width="238"
                  height="110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="illustration-04"
                      x1="369.483"
                      y1="-84.633"
                      x2="139.954"
                      y2="-199.798"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" stopOpacity=".01" />
                      <stop offset="1" stopColor="#fff" stopOpacity=".24" />
                    </linearGradient>
                  </defs>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M189.135 89.198c3.624 9.678 7.039 18.799 15.713 18.187 7.885-.548 19.733-2.523 33.152-5.256v2.04c-13.345 2.709-25.125 4.663-33.013 5.211-.331.023-.657.034-.975.034-9.441 0-13.176-9.972-16.792-19.627-3.571-9.536-6.946-18.545-15.389-16.96-13.086 2.455-24.348 3.539-37.385 4.794l-.024.002c-8.07.776-17.217 1.657-27.841 2.98-4.629.58-8.116 1.595-10.919 2.411l-.016.005c-6.68 1.947-10.032 2.924-14.897-6.267-3.62-6.842-8.541-7.827-14.24-8.967h-.001c-4.793-.959-10.225-2.046-15.65 -6.76C40.64 52.141 15.48 20.345.66 0H3.13c14.82 1.023 39.089 50.863 49.042 59.515 5.023 4.367 9.956 5.354 14.73 6.31 5.94 1.187 11.552 2.31 15.616 9.991 3.443 6.51 5.39 7.141 9.773 6.057-3.311.19-5.726-1.455-8.768-7.374-3.533-6.876-8.064-7.803-13.8 -8.976-4.642-.949-9.902-2.025-15.275-6.679C43.995 49.797 18.704 19.375 4.057 0h2.506C21.226 19.288 45.58 48.524 55.755 57.333c4.977 4.309 9.748 5.285 14.363 6.23l.005.001c5.763 1.178 11.206 2.292 15.178 10.021 3.255 6.333 5.085 6.977 9.146 5.928-3.035.107-5.304-1.569-8.148-7M189.135 89.198c3.624 9.678 7.039 18.799 15.713 18.187 7.885-.548 19.733-2.523 33.152-5.256v2.04c-13.345 2.709-25.125 4.663-33.013 5.211-.331.023-.657.034-.975.034-9.441 0-13.176-9.972-16.792-19.627-3.571-9.536-6.946-18.545-15.389-16.96-13.086 2.455-24.348 3.539-37.385 4.794l-.024.002c-8.07.776-17.217 1.657-27.841 2.98-4.629.58-8.116 1.595-10.919 2.411l-.016.005c-6.68 1.947-10.032 2.924-14.897-6.267-3.62-6.842-8.541-7.827-14.24-8.967h-.001c-4.793-.959-10.225-2.046-15.65 -6.76C40.64 52.141 15.48 20.345.66 0H3.13c14.82 1.023 39.089 50.863 49.042 59.515 5.023 4.367 9.956 5.354 14.73 6.31 5.94 1.187 11.552 2.31 15.616 9.991 3.443 6.51 5.39 7.141 9.773 6.057-3.311.19-5.726-1.455-8.768-7.374-3.533-6.876-8.064-7.803-13.8 -8.976-4.642-.949-9.902-2.025-15.275-6.679C43.995 49.797 18.704 19.375 4.057 0h2.506C21.226 19.288 45.58 48.524 55.755 57.333c4.977 4.309 9.748 5.285 14.363 6.23l.005.001c5.763 1.178 11.206 2.292 15.178 10.021 3.255 6.333 5.085 6.977 9.146 5.928-3.035.107-5.304-1.569-8.148-7"
                    fill="url(#illustration-04)"
                  />
                </svg>
              </div>

              <div className="relative flex flex-col lg:flex-row justify-between items-center">
                {/* CTA content */}
                <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
                  <h3 className="h3 text-white mb-2">Stay in the loop</h3>
                  <p className="text-purple-200 text-lg">
                    Join our newsletter to get top news before anyone else.
                  </p>
                </div>

                {/* CTA form */}
                <form className="w-full lg:w-1/2" onSubmit={submit}>
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                    <input
                      ref={subscriberEmail}
                      type="email"
                      className="w-full appearance-none bg-white-700 border border-blue-500 focus:border-blue-300 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-blue-400 placeholder-blue-400"
                      placeholder="Your best email…"
                      aria-label="Your best email…"
                    />
                    <button
                      type="submit"
                      className="btn text-blue-600 bg-blue-100 hover:bg-white shadow"
                    >
                      Subscribe
                    </button>
                  </div>
                  {/* Success message */}
                  {/* <p className="text-center lg:text-left lg:absolute mt-2 opacity-75 text-sm">Thanks for subscribing!</p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
