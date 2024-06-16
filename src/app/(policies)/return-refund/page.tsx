import React from "react";
import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

const RefReturns = () => {
  return (
    <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
      <h1 className="text-center text-2xl font-bold my-4">
        Refund and Return Policy
      </h1>
      <div className="container mx-auto px-4">
        <h4 className="text-lg font-semibold mt-4">
          Effective Date: June 2023
        </h4>
        <p className="text-justify mt-2">
          Thank you for choosing our website for your electronic repair needs.
          We strive to provide excellent service and customer satisfaction. In
          the event that you are not completely satisfied with your purchase, we
          have outlined our refund and return policy below.
        </p>

        <h4 className="text-lg font-semibold mt-4">Refund Policy</h4>
        <p className="text-justify mt-2">
          <span className="font-bold">Evaluation Fee: </span>
          In some cases, we may charge an evaluation fee for diagnosing and
          assessing the repair needs of your electronic device. This fee is
          non-refundable, even if you choose not to proceed with the repair
          service.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Service Fee: </span>
          If you have paid for a repair service and we are unable to fix the
          issue with your electronic device, we will refund the service fee in
          full.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Parts and Components: </span>
          If any parts or components used in the repair service are found to be
          defective or fail within the specified warranty period, we will
          replace or repair them at no additional cost. If a refund is
          requested, it will be provided for the cost of the defective parts or
          components.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">All repair sales are final: </span>
          Once we have successfully repaired or fixed your device, we do not
          offer refunds for any reason. We stand behind the quality of our
          repairs and strive to provide excellent service. If you have any
          concerns or issues with the repaired device, please contact our
          customer support team, and we will be happy to assist you.
        </p>

        <h4 className="text-lg font-semibold mt-4">Return Policy</h4>
        <p className="text-justify mt-2">
          <span className="font-bold">Incorrect or Damaged Items: </span>
          If you receive an incorrect or damaged item, please contact us within
          7 days of receipt. We will arrange for the return shipping and provide
          a replacement or refund once we have received the returned item.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Change of Mind: </span>
          We understand that circumstances may change, and you may decide to
          return a purchased item. If you change your mind about a product
          before it has been shipped, please contact us immediately. We will
          cancel the order and issue a refund for the full purchase price.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Eligibility and Conditions: </span>
          To be eligible for a return, the following conditions must be met:
          <ol className="list-decimal ml-6">
            <li>
              The item must be in its original condition, unused, and in the
              same packaging.
            </li>
            <li>
              All accessories, manuals, and other included items must be
              returned.
            </li>
            <li>
              The return must be initiated within 7 days of receiving the item.
            </li>
            <li>
              Proof of purchase, such as an order confirmation or receipt, may
              be required.
            </li>
          </ol>
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Return Process: </span>
          To initiate a return, please contact our customer support team. We
          will provide you with instructions on how to return the item. Return
          shipping costs may be the responsibility of the customer, unless the
          return is due to an incorrect or damaged item.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Refund Processing: </span>
          Once the returned item is received and inspected, we will notify you
          of the approval or rejection of your refund. If approved, the refund
          will be processed using the original payment method within 7 days.
        </p>

        <h5 className="text-lg font-semibold mt-4">Contact Us</h5>
        <p className="text-justify mt-2">
          If you have any questions or concerns regarding this Privacy Policy or
          our privacy practices, please contact us using the information
          provided below:
        </p>
        <p className="text-justify mt-2">
          <a href="tel:919-301-8950" className="text-blue-500 hover:underline">
            <FaPhoneAlt className="inline-block mr-2" /> 919-301-8950
          </a>
        </p>
        <p className="text-justify mt-2">
          <a
            href="mailto:support@techfix-raleigh.com"
            className="text-blue-500 hover:underline"
          >
            <FaRegEnvelope className="inline-block mr-2" />{" "}
            support@techfix-raleigh.com
          </a>
        </p>
        <p className="text-justify mt-2">
          We value your privacy and will respond to your inquiries in a timely
          manner.
        </p>
        <p className="text-justify mt-2">
          Please note that this is a generic privacy policy template and may
          need to be customized to align with your specific website and
          electronic repair services.
        </p>
      </div>
    </div>
  );
};

export default RefReturns;
