"use client";
import React, { useRef, useState, FormEvent } from "react";
//import { useRouter } from "next/router";
import { toast } from "react-toastify";
import TechFixAPI from "../helpers/techfixAPI";
import HelperMethods from "../helpers/HelperMethods";
import { sendConfirmationEmail } from "../API/generalServices";

const Quotes: React.FC = () => {
  //const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberErr, setPhoneNumberErr] = useState<boolean>(false);
  const deviceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isSignature, setIsSignature] = useState<boolean | any>(false);
  const [confirmationSubject, setConfirmationSubject] =
    useState<string>("Here's your quote!");
  const [confirmationMessage, setConfirmationMessage] = useState<string>(
    "Thank you for quoting with techfix, we have received your quote and one of our team members will get back to you within 24 hrs"
  );

  const resetForm = () => {
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    setPhoneNumber("");
    if (deviceRef.current) deviceRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    setIsSignature(false);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const phoneValidationResult =
      HelperMethods.validatePhoneNumber(phoneNumber);
    if (!phoneValidationResult) {
      setPhoneNumberErr(true);
      toast.error("Something went wrong!", { autoClose: 6000 });
      return;
    } else {
      setPhoneNumberErr(false);
    }

    try {
      const response = await TechFixAPI.post("Quotes/GetQuote", {
        FullName: nameRef.current?.value,
        Email: emailRef.current?.value,
        PhoneNumber: phoneNumber,
        deviceModel: deviceRef.current?.value,
        Description: descriptionRef.current?.value,
        signature: isSignature,
      });

      if (response) {
        await sendConfirmationEmail(
          emailRef.current?.value,
          confirmationSubject,
          confirmationMessage
        );
        toast.success(
          "Please check your junk or spam mail folder if you're expecting a reply and can't find it in your inbox, Thank you.",
          { autoClose: 9000 }
        );
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { autoClose: 6000 });
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 mb-10">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl text-center mb-6">Quote</h2>
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sender_name" className="block font-bold">
                Name
              </label>
              <input
                id="sender_name"
                type="text"
                name="name"
                ref={nameRef}
                placeholder="Name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="sender_email" className="block font-bold">
                Email
              </label>
              <input
                id="sender_email"
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="phoneNumber" className="block font-bold">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              minLength={10}
              onChange={(event) =>
                setPhoneNumber(
                  HelperMethods.formatFaxAndPhoneNumber(event.target.value)
                )
              }
              id="phoneNumber"
              value={phoneNumber}
              placeholder="Phone Number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {phoneNumberErr && (
              <p className="mt-2 text-sm text-red-600">
                Please use a valid phone number (000) 000-0000.
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="device" className="block font-bold">
              Device
            </label>
            <input
              id="device"
              ref={deviceRef}
              placeholder="Please enter device model number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="msg" className="block font-bold">
              Description
            </label>
            <textarea
              id="msg"
              name="message"
              ref={descriptionRef}
              placeholder="Describe your problem"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              style={{ height: "100px" }}
              required
            />
          </div>
          <p className="mt-4 text-sm">
            By clicking "Submit", you authorize TechFix and its stores to
            contact you with marketing information through written
            communications, calling or texting you at the phone number(s) you’ve
            provided. You understand these calls or texts may use
            computer-assisted dialing and/or prerecorded messages. This
            authorization is not required to complete the purchase or lease of
            any TechFix product. See our
            <a href="/privacy-policy" className="text-blue-500">
              {" "}
              Privacy Policy.
            </a>
          </p>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              value={isSignature}
              onChange={() => setIsSignature(!isSignature)}
              checked={isSignature}
              required
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isSignature">
              &nbsp; I Understand and agree to the &nbsp;
              <a href="/privacy-policy" className="text-blue-500">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-blue-500">
                Terms of service
              </a>
            </label>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quotes;
