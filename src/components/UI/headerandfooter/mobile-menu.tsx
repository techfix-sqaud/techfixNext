"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./CSS/mobileMenuCss.css";
import { webLinks } from "./menuItems";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // Toggle the dropdown
  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setDropdownOpen(true);
  };

  // Close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileNavOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll("#mobile-nav a");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      // Cleanup event listeners
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  // Close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </button>

      {/* Mobile navigation */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className={`absolute top-full z-20 left-0 w-full px-4 sm:px-6 transition-all duration-300 ease-in-out ${
          mobileNavOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          overflowY: mobileNavOpen ? "auto" : "hidden",
          opacity: mobileNavOpen ? 1 : 0.8,
        }}
      >
        <ul className="bg-gray-800 px-4 py-2">
          {webLinks.map((link, index) => (
            <li key={index} className="relative group">
              <div className="flex justify-between items-center">
                <Link href={link.href} className="font-medium flex-grow py-2">
                  {link.title}
                </Link>
                {link.dropdown && (
                  <button
                    className="p-2"
                    onClick={() => toggleDropdown(index)}
                    aria-expanded={activeDropdown === index}
                    aria-controls={`dropdown-${index}`}
                  >
                    {activeDropdown === index ? (
                      <MdOutlineKeyboardArrowUp />
                    ) : (
                      <MdOutlineKeyboardArrowDown />
                    )}
                  </button>
                )}
              </div>
              {link.dropdown && activeDropdown === index && (
                <li
                  key={index}
                  className="relative group"
                  style={{ marginLeft: "3%" }}
                >
                  {link.dropdown.map((dropdownLink, i) => (
                    <div className="flex justify-between items-center">
                      <Link
                        href={dropdownLink.href}
                        className="font-medium flex-grow py-2"
                      >
                        {dropdownLink.title}
                      </Link>
                    </div>
                  ))}
                </li>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/signup"
              className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-blue-600 hover:bg-gray-700 transition duration-150 ease-in-out"
              onClick={() => setMobileNavOpen(false)}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
