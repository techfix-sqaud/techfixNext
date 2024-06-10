import React from "react";
import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
      <h1 className="text-center text-2xl font-bold my-4">Privacy Policy</h1>
      <div className="container mx-auto px-4">
        <h4 className="text-lg font-semibold mt-4">
          Effective Date: June 2023
        </h4>
        <p className="text-justify mt-2">
          Thank you for visiting our website, which is dedicated to providing
          electronic repair services. We understand the importance of privacy
          and are committed to protecting the personal information you provide
          to us. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your personal information when you use our website.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Information We Collect: </span>
          When you visit our website or use our services, we may collect certain
          personal information that you voluntarily provide to us. This
          information may include:
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Contact Information:</span>
          Your name, email address, phone number, and postal address.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Device Information:</span>
          Information about the electronic device(s) you are seeking repair
          services for, such as make, model, and serial number.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Service Request Details:</span>
          Information related to the repair service you are requesting,
          including a description of the problem and any additional notes you
          provide.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Communication Information: </span>
          Any information you provide when contacting us through our website,
          email, or other means of communication.
        </p>
        <h3 className="text-xl font-semibold mt-4">
          How We Use Your Information
        </h3>
        <p className="text-justify mt-2">
          We may use the personal information we collect from you for the
          following purposes:
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Provide Services: </span>
          To process and fulfill your repair service requests and communicate
          with you regarding your inquiries and orders.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Improve Services: </span>
          To analyze and enhance our services, develop new features, and improve
          the overall user experience.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Customer Support: </span>
          To respond to your questions, requests, and provide technical support.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Marketing Communications:</span>
          With your consent, we may send you promotional emails or newsletters
          about our products, services, or special offers. You can opt-out of
          receiving these communications at any time.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Legal Compliance: </span>To comply with
          applicable laws, regulations, legal processes, or enforceable
          governmental requests.
        </p>
        <h5 className="text-lg font-semibold mt-4">
          Information Sharing and Disclosure
        </h5>
        <p className="text-justify mt-2">
          We do not sell or rent your personal information to third parties.
          However, we may disclose your information in the following
          circumstances:
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Service Providers: </span>
          We may engage trusted third-party service providers to assist us in
          operating our website and providing our services. These service
          providers are bound by confidentiality obligations and are only
          authorized to use your personal information as necessary to provide
          the requested services.
        </p>
        <p className="text-justify mt-2">
          <span className="font-bold">Legal Requirements:</span>
          We may disclose your information if required by law, governmental
          request, court order, or legal process, or to protect our rights,
          privacy, safety, or property, or that of our users or the public.
        </p>
        <h5 className="text-lg font-semibold mt-4">Data Security</h5>
        <p className="text-justify mt-2">
          We take reasonable measures to protect the security of your personal
          information. However, no method of transmission over the Internet or
          electronic storage is 100% secure, and we cannot guarantee absolute
          security. Please ensure that any passwords or account information you
          use on our website are kept confidential.
        </p>
        <h5 className="text-lg font-semibold mt-4">Children's Privacy</h5>
        <p className="text-justify mt-2">
          Our website and services are not directed to individuals under the age
          of 16. We do not knowingly collect personal information from children.
          If we become aware that we have inadvertently collected personal
          information from a child under 16, we will take steps to delete the
          information as soon as possible.
        </p>
        <h5 className="text-lg font-semibold mt-4">
          Updates to This Privacy Policy
        </h5>
        <p className="text-justify mt-2">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          material changes by posting the updated Privacy Policy on our website.
          Your continued use of our website after the effective date of the
          revised Privacy Policy constitutes your acceptance of the changes.
        </p>
        <h5 className="text-lg font-semibold mt-4">Contact Us</h5>
        <p className="text-justify mt-2">
          If you have any questions or concerns regarding this Privacy Policy or
          our privacy practices, please contact us using the information
          provided below:
        </p>
        <p className="text-justify mt-2">
          <a href="tel: 919-301-8950" className="text-blue-500 hover:underline">
            <FaPhoneAlt className="inline-block mr-2" /> 919-301-8950
          </a>
        </p>

        <p className="text-justify mt-2">
          <a
            href="mailto: support@techfix-raleigh.com"
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

export default Privacy;
