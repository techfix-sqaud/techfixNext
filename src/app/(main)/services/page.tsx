import React from "react";
import styles from "./css/Pricing.module.css";

const PricingPage: React.FC = () => {
  return (
    <div className="relative pt-32 pb-10 md:pt-40 md:pb-16 px-4 sm:px-8">
      <div className="mt-28">
        <h1 className="text-center text-6xl max-sm:text-5xl font-bold">
          Packages
        </h1>
        <div className="flex sm:space-x-4 max-sm:space-y-4 max-sm:flex-col">
          <div className="flex-1 text-xl mt-14 rounded-xl border border-[#4E67E5]/25 bg-[#080C23] p-10 w-full">
            <div className="text-[#4d66e5]">Basic Package</div>
            <div className="text-6xl my-5 font-light">$24/month</div>
            <ul>
              <li>Up to 5 pages</li>
              <li>Basic design customization</li>
              <li>Limited support</li>
            </ul>
            <button className="my-5 w-full text-black p-5 max-sm:p-2 rounded-3xl bg-[#4E67E5] text-xl max-sm:text-lg hover:bg-[#8a9dfc] transition-all">
              Purchase
            </button>
          </div>
          <div className="flex-1 text-md mt-14 rounded-md border border-[#9966FF]/25 bg-[#120d1d] p-10 w-full">
            <div className="text-[#950ca1]">Standard Package</div>
            <div className="text-6xl my-5 font-light">$49/month</div>

            <ul>
              <li>Up to 10 pages</li>
              <li>Enhanced design customization</li>
              <li>Priority support</li>
              <li>Basic SEO optimization</li>
            </ul>
            <button className="my-5 w-full text-black p-5 max-sm:p-2 rounded-3xl bg-[#9966FF] text-xl max-sm:text-lg hover:bg-[#BB99FF] transition-all">
              Purchase
            </button>
          </div>
          <div className="flex-1 text-xl mt-14 rounded-xl border border-[#F7E16F]/25 bg-[#19170d] p-10 w-full">
            <div className="text-[#F7E16F]">Premium Package</div>
            <div className="text-6xl my-5 font-light">Contact Sales</div>
            <ul>
              <li>Unlimited pages</li>
              <li>Custom design and branding</li>
              <li>Priority support with dedicated account manager</li>
              <li>Advanced SEO optimization</li>
              <li>E-commerce integration (if applicable)</li>
            </ul>
            <button className="my-5 w-full text-black p-5 max-sm:p-2 rounded-3xl bg-[#F7E16F] text-xl max-sm:text-lg hover:bg-[#fdf2bb] transition-all">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
