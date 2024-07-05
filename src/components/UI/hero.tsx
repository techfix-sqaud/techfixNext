import Link from "next/link";
import VideoThumb from "../../../public/images/hero-image-01.jpg";
import SlideShow from "./SlideShow";
import ModalVideo from "./modal-video";

export default function Hero() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Illustration behind hero content */}

        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Efficient Solutions for Tech Problems
            </h1>
            <p
              className="text-xl text-gray-400 mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              One Setup for All Tech Solutions, Beautiful Results Across
              Devices.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <Link
                  className="btn text-white bg-blue-600 hover:bg-gray-700 w-full mb-4 sm:w-auto sm:mb-0"
                  href="/contact"
                >
                  Contact us
                </Link>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <Link
                  className="btn text-white bg-gray-700 hover:bg-blue-800 w-full sm:w-auto sm:ml-4"
                  href="/quote"
                >
                  Get quote
                </Link>
              </div>
            </div>
          </div>

          <SlideShow />
        </div>
      </div>
    </section>
  );
}
