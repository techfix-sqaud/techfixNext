import React from "react";
import Image from "next/image";
import bus from "../../../../src/components/UI/Assets/bus.png";
import Quotes from "@/components/UI/QuoteForm";
import { FaArrowCircleRight } from "react-icons/fa";

const Page = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <div className="relative pt-5 pb-10 md:pt-24 md:pb-12"></div>

          <div className="top flex justify-center">
            <Image
              src={bus}
              alt="Contact Us Image"
              className="w-full h-auto max-w-4xl"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-blue-600">
              Techfix For Business{" "}
            </h1>
            <div className="flex flex-wrap justify-center"></div>
          </div>
          <div className="py-12 md:py-20 border-t border-gray-800"></div>

          <div className="body">
            <div className="headers flex justify-center mx-5 mt-5">
              <h1 className="text-4xl font-bold text-center text-blue-600">
                Why is Establishing a Trusted Repair Network Vital for Your
                Business Success?
              </h1>
            </div>
            <div className="content flex flex-col md:flex-row mx-10 mt-5 space-y-5 md:space-y-0 md:space-x-5">
              <div className="rightSection flex-1">
                <p>
                  At TechFix, we strive for technical and operational excellence
                  as the cornerstone of our commitment to delivering
                  high-quality services and ensuring organizational
                  effectiveness. Our primary focus lies in implementing
                  standardized procedures, providing exceptional customer
                  service, and continuously improving our operations.
                </p>
                <p>
                  We understand the value of dedicated service, industry
                  expertise, and reliable technicians in building strong
                  partnerships and earning your trust. Our team is dedicated to
                  offering all our customers the best service possible. This
                  commitment leads to satisfied customers who choose TechFix as
                  their preferred mobile device repair company, distinguishing
                  us from others in the industry.
                </p>
              </div>
              <div className="leftSection flex-1">
                <p>
                  To maintain our high standards, we constantly monitor our
                  performance levels through an ongoing improvement process.
                  This allows us to analyze and track every aspect of our
                  operations and technical training programs, enabling us to
                  adapt to industry changes promptly. As a result, our
                  technicians remain highly qualified and up-to-date in their
                  skills. Operating according to standardized policies and
                  procedures, we ensure efficiency and consistency in resource
                  utilization and our ability to provide quick solutions to our
                  customers.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-10">
            <div className="rightSection2 flex-1 mr-7 md:mr-0">
              <div className="chatBox flex flex-col justify-start items-start bg-blue-900 text-blue-900 rounded-lg p-2.5 w-full md:w-3/4 mt-5 mx-5">
                <div className="message bg-white rounded-lg p-2.5">
                  <h1 className="text-center text-blue-900">
                    Employee Discount Programs
                  </h1>
                  <p>
                    We can also offer customized Employee discount programs for
                    cell phone and other gadget repair or maintenance. Features
                    include:
                  </p>
                </div>
              </div>
            </div>
            <div className="leftSection2 flex-1 flex flex-col items-start ml-5 mt-3">
              <span className="flex items-center mb-2">
                <FaArrowCircleRight className="mr-2.5 align-middle text-blue-900 text-2xl" />
                Walk-in retail store, REPAIR2U™ onsite service, and mail-in
                service options
              </span>
              <span className="flex items-center mb-2">
                <FaArrowCircleRight className="mr-2.5 align-middle text-blue-900 text-2xl" />
                Personalized on-site coordination for Employee needs and
                schedules
              </span>
              <span className="flex items-center mb-2">
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
