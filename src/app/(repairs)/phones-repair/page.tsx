"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TechFixAPI from "@/components/helpers/techfixAPI";
import Quotes from "@/components/UI/QuoteForm";
import phone from "../../../components/UI/Assets/Phone1.png";
import i13 from "../../../components/UI/Assets/i13promax.png";
import googleimg from "../../../components/UI/Assets/gp.jpg";
import samsungImg from "../../../components/UI/Assets/samsungA.jpeg";
import { useRouter } from "next/navigation";
import Loader from "@/components/helpers/Loader";

// Define interface for phones
interface Phone {
  id: number;
  phoneName: string;
  phoneImage: any; // Use appropriate type for image
}

const PhoneCard = ({
  phone,
  navigateToItems,
}: {
  phone: Phone;
  navigateToItems: (id: number) => void;
}) => {
  return (
    <div onClick={() => navigateToItems(phone.id)} className="cursor-pointer">
      <div className="max-w-sm rounded overflow-hidden shadow-lg mb-4 dark:bg-gray-800">
        <div className="bg-white">
          <Image
            className="w-full h-24 object-cover"
            src={phone.phoneImage}
            alt={phone.phoneName}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{phone.phoneName}</div>
        </div>
      </div>
    </div>
  );
};

const PhoneRepair = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [iPhones, setIphones] = useState<Phone[]>([]);
  const [pixels, setGPixel] = useState<Phone[]>([]);
  const [samsungs, setSamsung] = useState<Phone[]>([]);

  const fetchPhones = async () => {
    try {
      setLoading(true);
      const response = await TechFixAPI.get("/PhoneServiceWeb/iphone");
      setIphones(
        response.data.map((phone: any) => ({ ...phone, phoneImage: i13 }))
      );

      const responsePixel = await TechFixAPI.get("/PhoneServiceWeb/pixel");
      setGPixel(
        responsePixel.data.map((phone: any) => ({
          ...phone,
          phoneImage: googleimg,
        }))
      );

      const responseSamsung = await TechFixAPI.get("/PhoneServiceWeb/samsung");
      setSamsung(
        responseSamsung.data.map((phone: any) => ({
          ...phone,
          phoneImage: samsungImg,
        }))
      );
    } catch (error) {
      console.error("Error fetching phone data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const navigateToItems = (id: number) => {
    router.push(`/phone/${id}`);
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="w-full">
                <Image
                  src={phone}
                  className="w-full h-100 object-cover"
                  alt="Phone"
                />
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 lg:items-start">
                <h1 className="text-2xl font-bold lg:text-left text-blue-600">
                  Phones repairs
                </h1>
                <p className="text-center lg:text-left">
                  Phones today are a major part of our daily activities. They
                  help you with everything from taking pictures to reminding you
                  of your appointments. When your phone gets damaged, it can
                  impact many of your daily tasks. Our technicians are trained
                  to fix smartphones so that your device can be back in your
                  hands as quickly as possible.
                </p>
              </div>
            </div>
            <div className="py-12 md:py-20 border-t border-gray-800"></div>
            <div className="container mx-auto my-10">
              <div className="flex justify-center mb-4">
                <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full">
                  Pick your phone to start repair
                </div>
              </div>
              {loading && <Loader />}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="m-4">
                  {iPhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      navigateToItems={navigateToItems}
                    />
                  ))}
                </div>
                <div className="m-4">
                  {pixels.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      navigateToItems={navigateToItems}
                    />
                  ))}
                </div>
                <div className="m-4">
                  {samsungs.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      navigateToItems={navigateToItems}
                    />
                  ))}
                </div>
              </div>
              <div className="py-12 md:py-20 border-t border-gray-800"></div>

              <Quotes />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneRepair;
