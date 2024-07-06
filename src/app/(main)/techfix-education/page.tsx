"use client";
import React, { useState } from "react";
import Image from "next/image";
import edu from "../../../../src/components/UI/Assets/edu.png";
import Quotes from "@/components/UI/QuoteForm";
import { FaArrowCircleRight } from "react-icons/fa";

const Page = () => {
  const [showWhyChooseUs, setShowWhyChooseUs] = useState<boolean>(true);
  const [showComputersRepair, setShowComputersRepair] =
    useState<boolean>(false);
  const [showTabletRepair, setShowTabletRepair] = useState<boolean>(false);

  const handleShowWhyChooseUs = () => {
    setShowComputersRepair(false);
    setShowTabletRepair(false);
    setShowWhyChooseUs(true);
  };

  const handleShowComputersRepair = () => {
    setShowComputersRepair(true);
    setShowTabletRepair(false);
    setShowWhyChooseUs(false);
  };

  const handleShowTabletRepair = () => {
    setShowComputersRepair(false);
    setShowTabletRepair(true);
    setShowWhyChooseUs(false);
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <div className="relative pt-5 pb-10 md:pt-24 md:pb-12"></div>
          <div className="top flex justify-center">
            <Image
              src={edu}
              alt="Contact Us Image"
              className="w-full h-auto max-w-4xl"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-blue-600">
              Techfix Repair For Schools
            </h1>
            <div className="flex flex-wrap justify-center"></div>
          </div>
          <div className="py-12 md:py-20 border-t border-gray-800"></div>

          <div className="body">
            <div className="headers flex justify-center mx-5 mt-5">
              <div className="flex flex-col md:flex-row justify-around mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <h2
                  className="text-2xl cursor-pointer whitespace-nowrap snap-start px-4 py-2 min-w-max text-blue-600"
                  onClick={handleShowWhyChooseUs}
                >
                  Why choose us?
                </h2>
                <h2
                  className="text-2xl cursor-pointer whitespace-nowrap snap-start px-4 py-2 min-w-max text-blue-600"
                  onClick={handleShowComputersRepair}
                >
                  Computers Repair
                </h2>
                <h2
                  className="text-2xl cursor-pointer whitespace-nowrap snap-start px-4 py-2 min-w-max text-blue-600"
                  onClick={handleShowTabletRepair}
                >
                  Tablets Repair
                </h2>
              </div>
            </div>
            <div className="content flex flex-col md:flex-row mx-10 mt-5 space-y-5 md:space-y-0 md:space-x-5">
              <div className="rightSection flex-1">
                <div className="mt-4 space-y-4">
                  {showWhyChooseUs && (
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                      <div className="lg:w-1/2 space-y-4">
                        <p>
                          Our highly skilled technicians specialize in tablet
                          repairs and laptop repairs specifically for schools.
                          Whether you have Chromebooks, iPads, MacBooks, or
                          Microsoft tablets, we are proficient in fixing both
                          school-issued and student-owned devices of all brands
                          and models.
                        </p>
                        <p>
                          When you choose TechFix as your technology repair
                          partner, you can expect quick turnaround times,
                          cost-effective solutions, and limited lifetime
                          warranties. We understand the importance of staying
                          within budget while addressing your repair needs, so
                          we will work closely with you to create a customized
                          plan that meets both your financial requirements and
                          repair specifications.
                        </p>
                      </div>
                      <div className="lg:w-1/2 space-y-4">
                        <p>
                          As a locally-owned business, TechFix is deeply
                          invested in the success of your students and the
                          educational community. Our franchisee, who will
                          personally handle your account, is a business owner
                          within your own community, ensuring that you receive
                          personalized attention and support.
                        </p>
                        <p>
                          If you're interested in discovering more about
                          partnering with the most reliable technology repair
                          service for educators, please fill out the form below.
                          A member of the TechFix team will reach out to you
                          promptly to discuss how we can best assist you!
                        </p>
                      </div>
                    </div>
                  )}
                  {showComputersRepair && (
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                      <div className="lg:w-1/2 space-y-4">
                        <h5 className="text-1xl text-blue-600">Water Damage</h5>
                        <p>
                          If your computer has suffered water damage, don't
                          worry! TechFix is here to help you restore your
                          student's computer to working order in no time.
                        </p>
                        <h5 className="text-1xl text-blue-600">Audio Issues</h5>
                        <p>
                          Functional audio is essential for a seamless learning
                          experience. If your school computer is experiencing
                          problems with broken, muffled, or distorted audio,
                          trust TechFix to diagnose and fix the issue.
                        </p>
                        <h5 className="text-1xl text-blue-600">
                          Battery Problems
                        </h5>
                        <p>
                          A faulty battery shouldn't hinder your students'
                          ability to learn. Count on TechFix for quick and
                          cost-effective battery replacement services to keep
                          your computers powered up and running.
                        </p>
                      </div>
                      <div className="lg:w-1/2 space-y-4">
                        <h5 className="text-1xl text-blue-600">
                          Cracked Screen
                        </h5>
                        <p>
                          Cracked screens are a common type of damage seen in
                          school computers. If cracked screens are affecting
                          your students' ability to learn, contact TechFix for
                          professional screen repair or replacement.
                        </p>
                        <h5 className="text-1xl text-blue-600">
                          Software Malfunctions
                        </h5>
                        <p>
                          Malfunctioning computer software can significantly
                          impact students' productivity. When your computer
                          needs a software tune-up or troubleshooting, rely on
                          the skilled technicians at TechFix to get it running
                          smoothly again.
                        </p>
                        <h5 className="text-1xl text-blue-600">
                          Camera Troubles
                        </h5>
                        <p>
                          When your school computers' cameras are not
                          functioning properly, TechFix's expert technicians are
                          here to provide reliable camera repair services,
                          ensuring smooth communication and virtual learning
                          experiences.
                        </p>
                      </div>
                    </div>
                  )}
                  {showTabletRepair && (
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                      <div className="lg:w-1/2 space-y-4">
                        <h5 className="text-1xl text-blue-600">Water Damage</h5>
                        <p>
                          Accidents can occur, and when a water-damaged tablet
                          hinders a student's ability to perform at their best,
                          rely on TechFix for professional water damage repair
                          services.
                        </p>
                        <h5 className="text-1xl text-blue-600">Audio Issues</h5>
                        <p>
                          Whether it's a broken or muffled audio, a functioning
                          speaker is crucial for a student's learning
                          experience. Trust TechFix to provide fast and
                          affordable audio repair solutions.
                        </p>
                        <h5 className="text-1xl text-blue-600">
                          Battery Problems
                        </h5>
                        <p>
                          A faulty battery in a tablet can disrupt a student's
                          productivity. Count on TechFix for professional
                          battery replacements to ensure uninterrupted work.
                        </p>
                      </div>
                      <div className="lg:w-1/2 space-y-4">
                        <h5 className="text-1xl text-blue-600">
                          Cracked Screen
                        </h5>
                        <p>
                          Cracked screens are a common issue with tablets in
                          K-12 education. Fortunately, TechFix offers swift
                          turnaround times for screen replacements, getting
                          students back to their studies quickly.
                        </p>
                        <h5 className="text-1xl text-blue-600">
                          Software Malfunctions
                        </h5>
                        <p>
                          When software malfunctions, it shouldn't impede
                          students' learning and completion of assignments.
                          TechFix offers comprehensive repair solutions for both
                          hardware and software issues in K-12 tablets.
                        </p>
                        <h5 className="text-1xl text-blue-600">
                          Camera Troubles
                        </h5>
                        <p>
                          Camera problems can hinder students' ability to
                          capture and work with visual content. With TechFix's
                          professional technicians, iPad camera repair and
                          replacement are hassle-free.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-7">
            <div className="rightSection2 flex-1 mr-7">
              <div className="chatBox flex flex-col justify-start items-start bg-blue-900 text-blue-900 rounded-lg p-2.5 w-full md:w-3/4 mt-5 mx-5">
                <div className="message bg-white rounded-lg p-2.5">
                  <h1 className="text-center text-blue-900">
                    Students Discount Programs
                  </h1>
                  <p>
                    We can also offer customized student discount programs for
                    cell phone and other gadget repair or maintenance. Features
                    include:
                  </p>
                </div>
              </div>
            </div>
            <div className="leftSection2 flex-1 flex flex-col items-start ml-5 mt-3 space-y-2">
              <span className="flex items-center">
                <FaArrowCircleRight className="mr-2.5 align-middle text-blue-900 text-2xl" />
                Walk-in retail store, REPAIR2U™ onsite service, and mail-in
                service options
              </span>
              <span className="flex items-center">
                <FaArrowCircleRight className="mr-2.5 align-middle text-blue-900 text-2xl" />
                Personalized on-site coordination for Employee needs and
                schedules
              </span>
              <span className="flex items-center">
                <FaArrowCircleRight className="mr-2.5 align-middle text-blue-900 text-2xl" />
                An internal extranet site link to communicate discounts and
                programs
              </span>
            </div>
          </div>
          <div className="py-12 md:py-20 border-t border-gray-800 mt-10"></div>
          <Quotes />
        </div>
      </div>
    </section>
  );
};

export default Page;
