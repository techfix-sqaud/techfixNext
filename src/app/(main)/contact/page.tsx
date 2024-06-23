"use client";
import { useRef, useState } from "react";
import { BsWhatsapp, BsEnvelope, BsPhone } from "react-icons/bs";
import Image from "next/image";
import { sendConfirmationEmail } from "@/components/API/generalServices";
import wallpaper from "@/components/UI/Assets/cont.png";
import { toast } from "react-toastify";
import HelperMethods from "../../../components/helpers/HelperMethods";
import TechFixAPI from "@/components/helpers/techfixAPI";

const ContactUs = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberErr, setPhoneNumberErr] = useState<boolean>(false);
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [failedMsg, setFailedMsg] = useState<string>("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneValidationResult =
      HelperMethods.validatePhoneNumber(phoneNumber);
    if (!phoneValidationResult) {
      setPhoneNumberErr(true);
      return;
    } else {
      setPhoneNumberErr(false);
    }

    try {
      const res = await TechFixAPI.post("Messages/MessageUs", {
        Name: nameRef.current?.value,
        Email: emailRef.current?.value,
        PhoneNumber: phoneNumber,
        Message: messageRef.current?.value,
        signature: isSignature,
      });

      if (res) {
        await sendConfirmationEmail(
          emailRef.current?.value || "",
          "Thanks for contacting us!",
          "We have received your message, we will get back to you as soon as possible!"
        );

        toast.success(
          "Please check your junk or spam mail folder if you're expecting a reply and can't find it in your inbox, Thank you.",
          { autoClose: 6000 }
        );

        resetForm();
      }
    } catch (error) {
      toast.error("Something went wrong!", { autoClose: 6000 });
      console.error("Error sending message:", error);
    }
  };

  const resetForm = () => {
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    setPhoneNumber("");
    if (messageRef.current) messageRef.current.value = "";
    setIsSignature(false);
    setPhoneNumberErr(false);
  };
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <div className="relative pt-5 pb-10 md:pt-24 md:pb-12"></div>

          <div className="top">
            <Image
              src={wallpaper}
              alt="Contact Us Image"
              width={1200}
              height={600}
              className="contactUsImg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">
              Contact us
            </h1>
            <div className="flex flex-wrap">
              {/* Replace Google Map iframe with Tailwind styles */}
              <div className="w-full md:w-1/2 md:pr-4">
                <iframe
                  className="w-full h-80"
                  src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=2830%20capital%20blvd,%20raleigh,%20nc,%20+(ifix)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
                <div className="mt-4">
                  <h5 className="font-bold">Hours</h5>
                  <div>M - F &nbsp; 10:00 AM - 5:00 PM</div>
                  <div>Sat &nbsp; 12:00 AM - 4:00 PM</div>
                  <div>Sun &nbsp; Closed</div>
                  <br />
                  <h5 className="font-bold">Customer Service</h5>
                  <div className="flex items-center">
                    <BsWhatsapp className="mr-1" />
                    <span>919-537-6191</span>
                  </div>
                  <div className="flex items-center">
                    <BsPhone className="mr-1" />
                    <span>919-301-8950</span>
                  </div>
                  <div className="flex items-center">
                    <BsEnvelope className="mr-1" />
                    <span>Support@techfix-raleigh.com</span>
                  </div>
                  <br />
                </div>
              </div>
              {/* Contact form */}
              <div className="w-full md:w-1/2 md:pl-4">
                <form onSubmit={submit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      ref={nameRef}
                      className="form-input w-full mt-1"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      ref={emailRef}
                      className="form-input w-full mt-1"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      minLength={10}
                      onChange={(event) =>
                        setPhoneNumber(
                          HelperMethods.formatFaxAndPhoneNumber(
                            event.target.value
                          )
                        )
                      }
                      value={phoneNumber}
                      className="form-input w-full mt-1"
                      placeholder="Phone Number"
                      required
                    />
                    {phoneNumberErr && (
                      <p className="text-red-500 mt-1">
                        Please use a valid phone number (000) 000-0000.
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block font-bold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      ref={messageRef}
                      className="form-textarea w-full mt-1"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <p>
                      By clicking "Submit", you authorize TechFix and its stores
                      to contact you with marketing information through written
                      communications, calling or texting you at the phone
                      number(s) you’ve provided. You understand these calls or
                      texts may use computer-assisted dialing and/or prerecorded
                      messages. This authorization is not required to complete
                      the purchase of any TechFix products. See our{" "}
                      <a href="/privacy-policy" className="text-blue-500">
                        Privacy Policy.
                      </a>
                    </p>
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={isSignature}
                      onChange={() => setIsSignature(!isSignature)}
                      required
                    />
                    <label htmlFor="agreement">
                      &nbsp; I Understand and agree to the &nbsp;
                      <a href="/terms" className="text-blue-500">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/terms" className="text-blue-500">
                        Terms of service
                      </a>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
