"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Quotes from "@/components/UI/QuoteForm";
import ipads from "../../../components/UI/Assets/ipad.png";
import ipadb from "../../../components/UI/Assets//ipadbd.png";
import tablet from "../../../components/UI/Assets//tablet.png";
import mic from "../../../components/UI/Assets//micro.png";
const TabletsRepair = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-red-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full">
                  <Image
                    src={ipads}
                    alt="Contact Us Image"
                    width={1200}
                    height={600}
                    className="contactUsImg"
                  />
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 lg:items-start">
                  <h1 className="text-2xl font-bold lg:text-left text-blue-600">
                    iPads & tablets repair
                  </h1>
                  <p className="text-center lg:text-left">
                    It’s easy to have a good relationship with your tablet or
                    iPad, as it offers the perfect mix of your phone and your
                    computer. You use it for work, school, and play. Your tablet
                    is a handy companion that is easy to take with you. If this
                    convenience has been interrupted by damage or malfunction,
                    we can fix the problem as quickly as possible to get it
                    ready for you.
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
                      src={ipadb}
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
                        iPads
                      </div>
                      <p className="text-xl text-gray-400 mb-4">
                        We can fix any generation of Apple iPad, including the
                        iPad Air. Let us return your iPad to the
                        high-functioning tool you expect your Apple to be.
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
                      src={tablet}
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
                        Samsung tablets
                      </div>

                      <p className="text-xl text-gray-400 mb-4">
                        Do you prefer Android from Google tablets or the
                        high-powered features of a Samsung Galaxy Tablet? Our
                        technicians can run a free diagnose and repair any
                        Android tablet so that it functions once again.
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
                      src={mic}
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
                        Microsoft Surfaces
                      </div>
                      <p className="text-xl text-gray-400 mb-4">
                        Many people prefer to use Microsoft windows to get
                        significant work done. An amazing Microsoft tablet comes
                        with Windows. you could use it as tablet. We can surley
                        fix it and get it back to work in a timely manner.
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

export default TabletsRepair;
