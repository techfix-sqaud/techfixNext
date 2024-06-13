import React from "react";

export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Unlocking the mysteries of device care.</h2>
          </div>
          <div
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none"
            data-aos-id-blocks
          >
            {/* 1st item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-blue-600"
                  d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 58C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z"
                />
                <path
                  className="fill-current text-black-100"
                  d="M22.5 34a1.5 1.5 0 01-3 0c0-5.523 4.477-10 10-10s10 4.477 10 10a1.5 1.5 0 01-3 0c0-3.86-3.14-7-7-7s-7 3.14-7 7z"
                />
                <path
                  className="fill-current text-black-100"
                  d="M29 44a3 3 0 016 0v2a3 3 0 01-6 0v-2z"
                />
              </svg>
              <h4 className="h4 mb-2">Water Damage Repair</h4>
              <p className="text-lg text-gray-400 text-center">
                Accidentally dropped your phone in water? Don&apos;t worry! Our
                specialized water damage repair service can rescue your device.
                We use advanced techniques to diagnose and repair water-damaged
                phones, bringing them back to life.
              </p>
            </div>

            {/* 2nd item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-blue-600"
                  d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 58C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z"
                />
                <path
                  className="fill-current text-black-100"
                  d="M40 28H24a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V30a2 2 0 00-2-2zm-2 16h-2v2a1 1 0 01-2 0v-2h-4v2a1 1 0 01-2 0v-2h-2V30h12v14z"
                />
                <path
                  className="fill-current text-black-300"
                  d="M37 12H27a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V14a2 2 0 00-2-2zm-2 10h-6v-6h6v6z"
                />
              </svg>
              <h4 className="h4 mb-2">Instant Screen Repair</h4>
              <p className="text-lg text-gray-400 text-center">
                We offer instant screen repair for all major phone brands.
                Whether you have a cracked screen or an unresponsive touch, our
                experts can fix it within minutes. Enjoy a seamless repair
                experience and get back to using your phone without any hassle.
              </p>
            </div>

            {/* 3rd item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-blue-600"
                  d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 58C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z"
                />
                <path
                  className="fill-current text-black-100"
                  d="M37 18H27a2 2 0 00-2 2v24a2 2 0 002 2h10a2 2 0 002-2V20a2 2 0 00-2-2zm-3 22h-4v-2h4v2zm0-6h-4v-2h4v2zm0-6h-4v-2h4v2z"
                />
              </svg>
              <h4 className="h4 mb-2">Battery Replacement</h4>
              <p className="text-lg text-gray-400 text-center">
                Is your phone&apos;s battery draining too quickly? We provide
                quick and affordable battery replacement services to ensure your
                phone lasts all day. Our high-quality batteries are guaranteed
                to improve your device&apos;s performance and longevity.
              </p>
            </div>

            {/* 4th item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-blue-600"
                  d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 58C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z"
                />
                <path
                  className="fill-current text-black-100"
                  d="M28 24h8v8h-8z"
                />
                <path
                  className="fill-current text-black-300"
                  d="M20 36h24v8H20z"
                />
              </svg>
              <h4 className="h4 mb-2">Charging Port Repair</h4>
              <p className="text-lg text-gray-400 text-center">
                Having trouble charging your phone? Our charging port repair
                service is here to help. We can fix loose or damaged charging
                ports, ensuring your phone charges correctly and efficiently.
                Say goodbye to the frustration of a malfunctioning charger.
              </p>
            </div>
            {/* 5th item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-blue-600"
                  d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 58C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z"
                />
                <path
                  className="fill-current text-black-100"
                  d="M29 21h6v22h-6z"
                />
                <path
                  className="fill-current text-black-300"
                  d="M23 29h18v10H23z"
                />
              </svg>
              <h4 className="h4 mb-2">Camera Repair</h4>
              <p className="text-lg text-gray-400 text-center">
                Capture your moments clearly again with our camera repair
                services. Whether your phone&apos;s camera is blurry, not
                focusing, or completely broken, we can restore it to its
                original condition. Get back to taking stunning photos and
                videos in no time.
              </p>
            </div>

            {/* 6th item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <svg
                className="w-16 h-16 mb-4"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-blue-600"
                  d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 58C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z"
                />
                <path
                  className="fill-current text-black-100"
                  d="M21 23h22v18H21z"
                />
                <path
                  className="fill-current text-gray-300"
                  d="M26 28h12M26 32h12M26 36h5"
                />
              </svg>
              <h4 className="h4 mb-2">Software Troubleshooting</h4>
              <p className="text-lg text-gray-400 text-center">
                Is your phone experiencing software issues like slow
                performance, crashes, or unresponsive apps? Our experts provide
                comprehensive software troubleshooting to resolve any problems
                and optimize your phone&apos;s performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
