import { title } from "process";
import {
  AiOutlineSetting,
  AiOutlineProduct,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {
  FaHome,
  FaServicestack,
  FaBook,
  FaEnvelope,
  FaSignInAlt,
  FaTachometerAlt,
  FaSupple,
  FaShoppingCart,
} from "react-icons/fa";
import { MdAccountBalance, MdReport } from "react-icons/md";
import { TbReport } from "react-icons/tb";
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
    label: "Suppliers",
    route: "/pos",
    icon: <FaSupple style={{ width: "30px", height: "30px" }} />,
    children: [
      { title: "Add supplier", href: "/services/web-development" },
      { title: "Update supplier", href: "/services/seo" },
      { title: "View supplier", href: "/Suppliers/display" },
    ],
  },
  {
    label: "Products",
    route: "#",
    icon: <AiOutlineProduct style={{ width: "30px", height: "30px" }} />,
    children: [
      { title: "Add products", href: "/products/add" },
      { title: "Bulk products", href: "/products/bulk" },
      { title: "Products", href: "/products/products" },
      { title: "Categories", href: "/Categories/display" },
      { title: "Services", href: "/products-services/display" },
    ],
  },
  {
    label: "Orders",
    route: "#",
    icon: <FaShoppingCart style={{ width: "30px", height: "30px" }} />,
    children: [{ title: "Create", href: "/sales/orders/create" }],
  },
  {
    label: "Users",
    route: "#",
    icon: <AiOutlineUserAdd style={{ width: "30px", height: "30px" }} />,
    children: [
      { title: "Add user", href: "/users/add" },
      { title: "Update user", href: "/users/add" },
      { title: "View", href: "/users/display" },
    ],
  },
  {
    label: "Settings",
    route: "/admin/settings",
    icon: <AiOutlineSetting style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "POS",
    route: "/sales/pos",
    icon: <MdAccountBalance style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "Accounting",
    route: "#",
    icon: <TbReport style={{ width: "30px", height: "30px" }} />,
    children: [
      { title: "Report", href: "/accounting/reports" },
      { title: "Invoice", href: "/accounting/invoice" },
    ],
  },
];

export const techfixEmployee = [
  {
    label: "Products",
    route: "/products/products",
    icon: <AiOutlineProduct style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "Orders",
    route: "/sales/orders/create",
    icon: <FaShoppingCart style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "Users",
    route: "/users/add",
    icon: <AiOutlineUserAdd style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "Settings",
    route: "/admin/settings",
    icon: <AiOutlineSetting style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "POS",
    route: "/sales/pos",
    icon: <MdAccountBalance style={{ width: "30px", height: "30px" }} />,
  },
  {
    label: "Accounting",
    route: "/accounting/reports",
    icon: <TbReport style={{ width: "30px", height: "30px" }} />,
  },
];
