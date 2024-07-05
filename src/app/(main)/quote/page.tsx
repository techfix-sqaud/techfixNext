import Image from "next/image";
import gq from "@/components/UI/Assets/gq.png";
import Quotes from "@/components/UI/QuoteForm";

const GetQuote = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800  dark:text-white">
          <div className="relative pt-5 pb-10 md:pt-24 md:pb-12"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid gap-8 items-center md:grid-cols-2">
            {/* Top Section - Image on the left, text on the right */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start">
              <div className="order-2 md:order-2">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-blue-600">
                  Request a Quote
                </h2>
                <p className="text-lg mb-6 text-gray-700 dark:text-white">
                  Fill the form below and we will reply with a custom quote for
                  your needs.
                </p>
              </div>
              <div className="order-1 md:order-1 mb-6 md:mb-0 md:mr-6">
                <div className="relative w-full h-auto">
                  <Image
                    src={gq}
                    alt="Get Quote Image"
                    className="rounded-lg"
                    layout="responsive"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section - Quote form */}
            <div className="order-1 md:order-2 pt-10 dark:text-black">
              <div
                className="relative z-10 p-8 bg-white rounded-lg shadow-lg dark:text-white dark:bg-boxdark "
                style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              >
                <Quotes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetQuote;
