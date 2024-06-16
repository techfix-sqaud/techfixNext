import React from "react";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaRegEnvelope,
  FaMapMarkedAlt,
  FaCcAmex,
  FaCcDiscover,
  FaCcApplePay,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmazonPay,
} from "react-icons/fa";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                <Link href="/" className="inline-block" aria-label="Cruip">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    viewBox="65 0 607 264"
                    version="1.1"
                  >
                    <path
                      d="M 216.369 56.493 C 205.406 58.877, 200.537 62.644, 200.706 68.610 C 200.832 73.054, 202.807 75.227, 209.321 78.093 C 213.606 79.979, 216.762 80.445, 227.607 80.798 C 240.963 81.231, 245 80.472, 245 77.524 C 245 75.118, 243.052 74.697, 231.096 74.521 C 217.317 74.318, 212 72.663, 212 68.577 C 212 66.759, 212.910 65.554, 215.250 64.276 C 218.071 62.734, 221.271 62.500, 239.500 62.500 L 260.500 62.500 261 102.500 C 261.359 131.254, 261.842 143.096, 262.715 144.620 C 267.586 153.114, 295.570 154.281, 304.958 146.382 L 307.978 143.841 308.239 103.170 L 308.500 62.500 343.500 62.214 C 379.865 61.917, 385.217 62.373, 388.540 66.044 C 390.772 68.510, 389.620 71.610, 385.679 73.742 C 383.035 75.172, 378.689 75.549, 359.851 75.981 C 332.791 76.601, 333 76.519, 333 86.481 C 333 97.355, 336.617 98.939, 361.527 98.976 C 378.510 99.001, 382 99.847, 382 103.934 C 382 107.953, 379.568 108.478, 358.553 109 C 332.034 109.658, 333 109.092, 333 123.988 C 333 135.904, 333.536 137, 339.363 137 C 343.923 137, 345 134.715, 345 125.040 L 345 116.223 362.750 115.797 C 381.543 115.346, 385.780 114.435, 390.736 109.778 C 394.047 106.668, 393.818 101.158, 390.236 97.726 C 385.282 92.980, 380.427 92, 361.874 92 L 345 92 345 87.086 L 345 82.172 366.250 81.798 C 388.141 81.413, 389.756 81.140, 396.265 76.720 C 397.786 75.687, 399.754 73.442, 400.640 71.730 C 402.135 68.838, 402.122 68.383, 400.464 65.304 C 398.421 61.510, 391.384 57.660, 383.421 55.979 C 380.169 55.293, 364.819 55.014, 340.743 55.204 C 304.301 55.491, 303.057 55.565, 300.322 57.608 L 297.500 59.715 297.239 100.913 L 296.978 142.111 293.279 143.657 C 288.181 145.787, 276.926 145.148, 274.073 142.566 C 272.042 140.728, 272 139.889, 272 101 C 272 56.392, 272.514 59.373, 264.316 56.449 C 259.141 54.603, 224.912 54.634, 216.369 56.493 M 369.011 182.487 C 367.124 184.761, 368.551 187, 371.887 187 C 377.784 187, 380.131 184.211, 376.066 182.035 C 373.325 180.568, 370.450 180.752, 369.011 182.487 M 331.667 182.667 C 331.300 183.033, 331 188.385, 331 194.560 C 331 206.600, 331.177 207, 336.510 207 C 339.842 207, 342 204.417, 342 200.429 L 342 197 350.309 197 C 359.132 197, 362.712 195.688, 361.056 193.062 C 360.413 192.041, 357.509 191.497, 351.075 191.189 C 343.018 190.804, 342 190.545, 342 188.878 C 342 187.162, 342.890 187, 352.300 187 C 362.639 187, 365.387 186.172, 364.315 183.378 C 363.897 182.288, 360.498 182, 348.060 182 C 339.410 182, 332.033 182.300, 331.667 182.667 M 368.714 188.620 C 367.487 189.846, 367.902 204.502, 369.200 205.800 C 370.570 207.170, 374.872 207.368, 376.793 206.149 C 377.724 205.559, 378.004 202.971, 377.793 196.914 L 377.500 188.500 373.464 188.203 C 371.244 188.040, 369.106 188.227, 368.714 188.620 M 384.250 188.662 C 382.104 189.528, 382.871 191.751, 386.250 194.462 L 389.500 197.069 385.500 200.558 C 381.644 203.921, 381.570 204.100, 383.441 205.523 C 386.318 207.712, 389.087 207.288, 392.974 204.066 L 396.448 201.186 399.759 204.093 C 403.368 207.262, 406.571 207.766, 409.500 205.624 C 411.286 204.318, 411.181 204.064, 407.451 200.647 L 403.521 197.046 406.934 194.196 C 411.140 190.685, 410.665 188, 405.836 188 C 403.713 188, 401.669 188.901, 399.859 190.635 L 397.109 193.270 393.978 190.635 C 391.062 188.181, 387.322 187.423, 384.250 188.662"
                      stroke="none"
                      fill="gray"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M 293.250 181.662 C 292.349 182.026, 292 185.464, 292 193.976 C 292 206.666, 292.142 207, 297.547 207 C 300.578 207, 302 204.341, 302 198.673 C 302 193.881, 302.914 193, 307.882 193 C 311.826 193, 313 194.742, 313 200.593 C 313 206.055, 313.794 207, 318.382 207 C 321.877 207, 323 205.033, 323 198.911 C 323 194.796, 322.470 192.568, 321.086 190.861 C 319.344 188.712, 318.403 188.500, 310.586 188.500 C 302.431 188.500, 301.999 188.390, 302 186.321 C 302 182.263, 297.586 179.913, 293.250 181.662 M 187.380 183.452 C 186.348 186.141, 188.086 187, 194.559 187 L 201 187 201 195.965 C 201 205.690, 201.749 207, 207.312 207 C 211.055 207, 211.888 205.120, 212.206 195.950 L 212.500 187.500 219.169 187 C 226.386 186.459, 227.565 185.915, 226.655 183.543 C 225.796 181.304, 188.238 181.217, 187.380 183.452 M 228.619 189.034 C 219.706 191.703, 218.397 200.473, 226.280 204.710 C 230.883 207.185, 246.505 207.209, 250.262 204.748 C 254.364 202.060, 252.871 199.640, 247.608 200.447 C 236.837 202.100, 234.490 202.123, 232.500 200.597 C 230.663 199.189, 231.357 199.060, 241 199.016 C 246.775 198.991, 252.102 198.588, 252.837 198.122 C 255.534 196.413, 253.692 192.597, 249.038 190.250 C 244.298 187.860, 234.493 187.276, 228.619 189.034 M 263.386 189.912 C 256.085 193.228, 255.463 201.029, 262.207 204.693 C 266.899 207.243, 281.460 207.239, 285.355 204.687 C 286.954 203.639, 287.987 202.161, 287.803 201.187 C 287.372 198.916, 282.598 198.467, 279.790 200.435 C 276.769 202.550, 271.726 202.409, 268.911 200.129 C 266.673 198.317, 266.655 198.176, 268.323 195.629 C 269.739 193.469, 270.808 193, 274.323 193 C 276.675 193, 279.083 193.483, 279.673 194.073 C 281.387 195.787, 287.428 194.792, 287.819 192.731 C 288.669 188.243, 271.439 186.255, 263.386 189.912 M 233 193.500 C 230.654 194.841, 230.932 194.929, 237.500 194.933 C 243.869 194.936, 244.325 194.804, 242.559 193.468 C 240.126 191.628, 236.252 191.641, 233 193.500"
                      stroke="none"
                      fill="#5c5c5c"
                      fill-rule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="text-gray-400">
                TechFix is an independent service company and is not affiliated
                with Apple Inc. The trademarks Phone, iPod, iPad, and Mac. are
                registered trademarks of Apple Inc. All product names mentioned
                herein may be trademarks of their respective owners.{" "}
              </div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">
              {/* 2nd block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">Useful links</h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/contact"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/privacy"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/return-refund"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Return & Refund
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/terms"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Terms of use
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/track"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Track order
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">
                  For Education & Business
                </h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      TechFix && Education
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      TechFix & Business
                    </Link>
                  </li>
                </ul>
              </div>
              {/* 4th block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">Company</h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="https://goo.gl/maps/8YDm5EZokkmrszXv5"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      <FaMapMarkedAlt className="inline-block mr-2" /> Raleigh,
                      NC, United States
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="tel: 919-301-8950"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      <FaPhoneAlt className="inline-block mr-2" /> 919-301-8950
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="mailto: support@techfix-raleigh.com"
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      <FaRegEnvelope className="inline-block mr-2" />{" "}
                      support@techfix-raleigh.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">
            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <Link
                  href="/"
                  className="flex justify-center items-center text-blue-600 bg-gray-800 hover:text-gray-100 hover:bg-gray-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  href="/"
                  className="flex justify-center items-center text-blue-600 bg-gray-800 hover:text-gray-100 hover:bg-gray-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Github"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  href="/"
                  className="flex justify-center items-center text-blue-600 bg-gray-800 hover:text-gray-100 hover:bg-gray-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  href="/"
                  className="flex justify-center items-center text-blue-600 bg-gray-800 hover:text-gray-100 hover:bg-gray-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20.145" cy="11.892" r="1" />
                    <path d="M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
                    <path d="M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  href="/"
                  className="flex justify-center items-center text-blue-600 bg-gray-800 hover:text-gray-100 hover:bg-gray-600 rounded-full transition duration-150 ease-in-out"
                  aria-label="Linkedin"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="text-gray-400 text-sm mr-4">
              &copy; 2022 - {currentYear} TechFix LLC. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
