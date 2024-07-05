import { title } from "process";
import { AiOutlineSetting, AiOutlineProduct } from "react-icons/ai";
import {
  FaHome,
  FaServicestack,
  FaBook,
  FaEnvelope,
  FaSignInAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
export const webLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Repairs",
    href: "#",
    dropdown: [
      { title: "Phones repair", href: "/phones-repair" },
      { title: "Computers repair", href: "/computers-repair" },
      { title: "Tablets repair", href: "/tablets-repair" },
      { title: "Consoles repair", href: "/consoles-repair" },
    ],
  },
  {
    title: "Services",
    href: "#",
    dropdown: [
      { title: "Web developments", href: "/" },
      { title: "Smart home", href: "/" },
      { title: "Mobile App", href: "/" },
      { title: "Management system", href: "/" },
    ],
  },
  {
    title: "Booking",
    href: "/booking",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Sign in",
    href: "/signin",
  },
];

export const techfixAdmin = [
  {
    label: "Dashboard",
    route: "/admin",
    icon: <FaTachometerAlt style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "Products",
    route: "#",
    icon: <AiOutlineProduct style={{ width: "30px", height: "30px" }} />,
    dropdown: [
      { title: "Add products", href: "/services/web-development" },
      { title: "Bulk products", href: "/services/seo" },
    ],
  },
  {
    label: "Settings",
    route: "/admin/settings",
    icon: <AiOutlineSetting style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "POS",
    route: "/pos",
    icon: <MdAccountBalance style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "Sign in",
    route: "/signin",
    icon: <FaSignInAlt style={{ width: "30px", height: "30px" }} />,
  },
];
