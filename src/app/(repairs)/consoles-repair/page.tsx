"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Quotes from "@/components/UI/QuoteForm";
import consoles from "../../../components/UI/Assets/Consoles.png";
import nin from "../../../components/UI/Assets//n.png";
import xbox from "../../../components/UI/Assets//xbox.png";
import ps from "../../../components/UI/Assets//ps.png";
const ConsolesRepair = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-red-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full">
                  <Image
                    src={consoles}
                    alt="Contact Us Image"
                    width={1200}
                    height={600}
                    className="contactUsImg"
                  />
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 lg:items-start">
                  <h1 className="text-2xl font-bold lg:text-left text-blue-600">
                    Gaming consoles repairs
                  </h1>
                  <p className="text-center lg:text-left">
                    You're a gamer who has a big problem with your equipment?
                    Let us help you to get rid of it. Our technicians can check
                    the problem with your gaming console and get it done for
                    your next game. Just bring your console to us will get it
                    ready for you. Our technicians can fix it so you can be
                    available for your next gaming adventure.
                  </p>
                </div>
              </div>
              <div className="py-12 md:py-20 border-t border-gray-800"></div>
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
                      src={nin}
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
                        Nintando Switch
                      </div>
                      <p className="text-xl text-gray-400 mb-4">
                        We can fix any of the various Nintendo game devices that
                        you may have. Nintendo consoles are one the best gaming
                        consoles for all ages. You can connect it to the TV or
                        play with it in bed. so will do our best to get ready
                        for you quickly.
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
                      src={xbox}
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
                        Xbox
                      </div>

                      <p className="text-xl text-gray-400 mb-4">
                        If your preferred game console is an Xbox, we have the
                        experience to diagnose the problem quickly. Our
                        technicians are experts in the common problem and error
                        codes unique to Xbox devices.
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
                      src={ps}
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
                        Playstation
                      </div>
                      <p className="text-xl text-gray-400 mb-4">
                        Playstations is one the oldest popular gaming consoles
                        since the 90s. Many of us spent a lot of time playing
                        with it, and they still improved it with massive
                        features from time to time. So we will keep it usable as
                        always.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-12 md:py-20 border-t border-gray-800"></div>

                <Quotes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsolesRepair;
