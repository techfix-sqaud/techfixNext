"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import sm from "../UI/Assets/smarthome.jpeg";
import phone from "../UI/Assets/phone.jpg";
import repair from "../UI/Assets/laptop.jpg";
import gaming from "../UI/Assets/gaming.jpeg";
import mother from "../UI/Assets/motherboard.jpg";

const SlideShow = () => {
  const images = [
    { src: sm, alt: "Smart Home", caption: "Smart Home" },
    { src: phone, alt: "Phone Repair", caption: "Phone Repair" },
    { src: repair, alt: "Computer Repair", caption: "Computer Repair" },
    { src: gaming, alt: "Gaming Consoles", caption: "Gaming Consoles" },
    { src: mother, alt: "Motherboard", caption: "Motherboard" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full px-4 max-w-screen-lg mx-auto pt-8 pb-8">
      <div className="relative w-full h-0 pb-[56.25%]">
        {" "}
        {/* 16:9 Aspect Ratio */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute inset-0 flex justify-center items-end bg-black bg-opacity-50 rounded-md p-4">
            <h3 className="text-white text-lg md:text-2xl font-bold mb-2">
              {images[currentIndex].caption}
            </h3>
          </div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white cursor-pointer p-2 bg-black bg-opacity-50 rounded-full"
            onClick={handlePrevClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white cursor-pointer p-2 bg-black bg-opacity-50 rounded-full"
            onClick={handleNextClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19l7-7-7-7"
              />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
