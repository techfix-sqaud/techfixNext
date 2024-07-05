"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import desk from "../../../components/UI/Assets/pc.png";
import imac from "../../../components/UI/Assets/imac.png";
import laptop from "../../../components/UI/Assets/laptoppc.png";
import mac from "../../../components/UI/Assets/macbook.png";
import comp from "../../../components/UI/Assets/comp.png";
import { toast } from "react-toastify";
import Quotes from "@/components/UI/QuoteForm";

const ComputersRepair = () => {
  const hasEffectRun = useRef(false);

  useEffect(() => {
    if (!hasEffectRun.current) {
      toast.warning(
        "Computer hardware repairs need at least a couple of days!",
        {
          autoClose: 9000,
        }
      );
      hasEffectRun.current = true;
    }
  }, []);
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="w-full">
              <Image
                src={comp}
                alt="Contact Us Image"
                width={1200}
                height={600}
                className="contactUsImg"
              />
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 lg:items-start">
              <h1 className="text-2xl font-bold lg:text-left text-blue-600">
                Computer repairs
              </h1>
              <p className="text-center lg:text-left">
                Few things can disrupt your work and your life as much as a
                damaged computer. Living without this essential equipment can be
                almost impossible. We do our best to get your device back to
                life as soon as possible
              </p>
            </div>
          </div>
          <div className="py-12 md:py-20 border-t border-gray-800"></div>

          {/* Items */}
          <div className="grid gap-20">
            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
                data-aos="fade-up"
              >
                <Image
                  className="max-w-full mx-auto md:max-w-none h-auto"
                  src={desk}
                  width={540}
                  height={405}
                  alt="Features 01"
                />
              </div>
              {/* Content */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-blue-600 mb-2">
                    Personal computers
                  </div>
                  <p className="text-xl text-gray-400 mb-4">
                    Your Computer desktop is an amazing option for daily work or
                    even for gaming. we offer fast and reliable computer repair
                    services with a free diagnostics. You can trust us to handle
                    your computer with care and treat it as a valuable
                    possession. Our technicians are heighly quailfied to repair
                    computers our even to assemble it for you.
                  </p>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl"
                data-aos="fade-up"
              >
                <Image
                  className="max-w-full mx-auto md:max-w-none h-auto"
                  src={laptop}
                  width={540}
                  height={405}
                  alt="Features 02"
                />
              </div>
              {/* Content */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-left"
              >
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-blue-600 mb-2">
                    Laptops
                  </div>

                  <p className="text-xl text-gray-400 mb-4">
                    Your laptop is an important daily equipment you want it to
                    function as smoothly as the day you bought it. we offer fast
                    and reliable laptop repair services with a free diagnostics.
                    You can trust us to handle your computer with care and treat
                    it as a valuable possession. Our technicians are heighly
                    quailfied to repair computers.
                  </p>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
                data-aos="fade-up"
              >
                <Image
                  className="max-w-full mx-auto md:max-w-none h-auto"
                  src={mac}
                  width={540}
                  height={405}
                  alt="Features 03"
                />
              </div>
              {/* Content */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-blue-600 mb-2">
                    Macbook
                  </div>
                  <p className="text-xl text-gray-400 mb-4">
                    We’re the best in the business because we have the parts and
                    tools to get your Apple laptop repaired quickly and
                    affordably. We fix common issues every single day on devices
                    like MacBook Air, MacBook Pro. After we repair your device,
                    we test and retest to ensure your laptop is performing
                    perfectly. limited warranty on all parts and labor.
                  </p>
                </div>
              </div>
            </div>

            {/* 4th item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl"
                data-aos="fade-up"
              >
                <Image
                  className="max-w-full mx-auto md:max-w-none h-auto"
                  src={imac}
                  width={540}
                  height={405}
                  alt="Features 02"
                />
              </div>
              {/* Content */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-left"
              >
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-blue-600 mb-2">
                    iMac
                  </div>

                  <p className="text-xl text-gray-400 mb-4">
                    Do you prefer Android from Google tablets or the
                    high-powered features of a Samsung Galaxy Tablet? Our
                    technicians can run a free diagnose and repair any Android
                    tablet so that it functions once again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12 md:py-20 border-t border-gray-800"></div>

        <Quotes />
      </div>
    </section>
  );
};

export default ComputersRepair;
