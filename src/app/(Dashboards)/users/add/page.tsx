"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "@/components/contexts/AuthContext";
import CardTitle from "@/components/UI/cardTitle";
import { FaPhone } from "react-icons/fa";
import Dropdown from "@/components/UI/techfixDropdown";
import { toast } from "react-toastify";
import {
  _createUser,
  _subscriber,
  sendConfirmationEmail,
} from "@/components/API/generalServices";
import { UserData } from "@/components/contexts/types/UserData";
import { user_Roles } from "@/components/helpers/Enums";
import HelperMethods from "@/components/helpers/HelperMethods";
import Alert from "@/components/helpers/Alert";
import Checkbox from "@/components/UI/techfixCheckbox";

const addUser = () => {
  const { userProfile } = useContext(AuthContext)!;
  const [selectedValue, setSelectedValue] = useState("CUSTOMER");
  const [userData, setUserData] = useState<UserData>();
  const [phoneNumber, setPhoneNumber] = useState<string>(
    userData?.mobile || ""
  );
  const [errorMsg, setErrorMsg] = useState<string | null>("");
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const [subscribeOption, setSubscribeOption] = useState<boolean>(false);
  const confirmationSubject = "Welcome to TechFix !";
  const confirmationMessage =
    "Welcome to TechFix! We are excited to have you as a new customer. Thank you for choosing us!";
  const options = user_Roles.map((role) => ({ label: role, value: role }));

  const handleAutocompleteChange = (value: string) => {
    setSelectedValue(value);
  };
  //   const handleSubscribe = (subscribe: boolean) => {
  //     setSubscribeOption(subscribe);
  //   };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData?.firstName || !userData?.last_name || !phoneNumber) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      const response = await _createUser(userData, phoneNumber, isSignature);
      if (response) {
        toast.success("New user has been added successfully!!", {
          autoClose: 3000,
        });
        if (userData.email) {
          await sendConfirmationEmail(
            userData.email,
            confirmationSubject,
            confirmationMessage
          );
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Something went wrong", { autoClose: 5000 });
        console.error(error);
      }
    }

    if (subscribeOption) {
      try {
        await _subscriber({
          email: userData.email,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Subscription went wrong", { autoClose: 3000 });
          console.error(error);
        }
      }
    }
  };

  //   const handleUpdate = async (e: any) => {
  //     e.preventDefault();
  //     try {
  //       const response = await TechFixAPI.put(
  //         `Users/update/${initialUserData?.id}`,
  //         {
  //           id: initialUserData.id,
  //           firstName: firstName,
  //           middleName: middleName,
  //           last_name: lastName,
  //           mobile: phoneNumber,
  //           email: email,
  //           role: userRole,
  //           signature: isSignature,
  //         }
  //       );
  //       if (response) {
  //         toast.success("User information has been successfully updated!", {
  //           autoClose: 3000,
  //         });
  //         if (fetchUserData) {
  //           fetchUserData();
  //         }
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         setErrorMsg(error.message || "Something went wrong");
  //       }
  //     }
  //     if (subscribeOption) {
  //       try {
  //         await _subscriber(email);
  //       } catch (error) {
  //         if (error instanceof Error) {
  //           toast.error("Subscription went wrong", { autoClose: 3000 });
  //           console.error(error);
  //         }
  //       }
  //     }
  //   };

  return (
    <div className="flex justify-center">
      <div className="mx-auto max-w-270">
        <CardTitle
          baseName="users"
          pageName={
            userProfile.role === "EMPLOYEE" ? `Add customer` : "Add user"
          }
        />

        {/* <div className="grid grid-cols-5 gap-8"> */}
        <div className="col-span-5 xl:col-span-3 mx-auto">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                User Information
              </h3>
            </div>
            <div className="p-7">
              {errorMsg && <Alert type="error" message={errorMsg} />}

              <form onSubmit={handleSubmit}>
                {" "}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      First Name
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First name"
                        defaultValue={userData?.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Last Name
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        defaultValue={userData?.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@email.com"
                      defaultValue={userData?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="(000)-000-0000"
                      value={phoneNumber}
                      onChange={(event) =>
                        setPhoneNumber(
                          HelperMethods.formatFaxAndPhoneNumber(
                            event.target.value
                          )
                        )
                      }
                    />
                  </div>
                </div>
                {userProfile.role === "ADMIN" && (
                  <div className="mb-5.5">
                    <div className="relative">
                      <Dropdown
                        label="Role"
                        value={selectedValue}
                        onChange={handleAutocompleteChange}
                        options={options}
                        placeholder="Select a role"
                        defaultValue={selectedValue}
                      />
                    </div>
                  </div>
                )}
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <Checkbox
                      id="signature"
                      isChecked={isSignature}
                      label={"Signature"}
                      onCheckboxChange={() => setIsSignature(true)}
                    />
                    <div className="text-sm leading-6">
                      <p className="text-gray-500">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          target="_blank"
                          className="text-blue-500"
                        >
                          Terms of use
                        </Link>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                    </div>
                  </div>
                  <Checkbox
                    id="subscribe"
                    isChecked={subscribeOption}
                    label={"Subscribe to our newsletter"}
                    onCheckboxChange={() => setSubscribeOption(true)}
                  />
                </div>
                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default addUser;
