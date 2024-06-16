"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import iphone from "../UI/Assets/iphone.png";
import laptop from "../UI/Assets/laptop.png";
import tablet from "../UI/Assets/ipadCart.png";
import consoles from "../UI/Assets/console.jpeg";

const Body = () => {
  const router = useRouter();
  const items = [
    { id: 1, title: "phones", img: iphone },
    { id: 2, title: "Computers", img: laptop },
    { id: 3, title: "Tablets", img: tablet },
    { id: 4, title: "Consoles", img: consoles },
  ];

  const navigatetoitems = (id: number) => {
    switch (id) {
      case 1:
        router.push("/phones");
        break;
      case 2:
        router.push("/computers");
        break;
      case 3:
        router.push("/tablets");
        break;
      case 4:
        router.push("/consoles");
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
            <div className="container mx-auto py-8 px-4">
              <h1 className="h1 mb-4 text-center" data-aos="fade-up">
                Select your device to Get it fix right now
              </h1>
              <h4 className="text-lg text-center mb-2">
                Reliable Repair for All devices with professional workers
              </h4>
              <p className="text-center mb-4">
                We'll beat any competitors published price for the same repair.
                Starting with{" "}
                <span className="text-red-600 font-bold">
                  free diagnostics.
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigatetoitems(item.id)}
                    className="cursor-pointer transform hover:-translate-y-2 transition duration-500 ease-in-out"
                  >
                    <div className="overflow-hidden rounded-md shadow-md bg-white">
                      {/* Apply 'bg-white' directly to ensure only card background is white */}
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
