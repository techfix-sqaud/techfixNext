import React from "react";
import Link from "next/link";
import SidebarItem from "@/components/helpers/SidebarItem";
import { techfixAdmin, techfixEmployee } from "./menuItems";
import "../../../app/css/style.css";
import { LuLogOut } from "react-icons/lu";
import useLogin from "@/components/hooks/useLogin";

const EmployeeNav = () => {
  const { handleLogout } = useLogin();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-30 flex-col overflow-y-hidden duration-300 ease-linear bg-boxdark lg:static lg:translate-x-0`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/admin">{/* <a className="text-white">Admin</a> */}</Link>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {techfixEmployee.map((menuItem, menuIndex) => (
              <SidebarItem key={menuIndex} item={menuItem} showLabels={false} />
            ))}
          </ul>

          {/* Logout Icon */}
          <div className="flex justify-center">
            <LuLogOut
              onClick={handleLogout}
              style={{ width: "30px", height: "30px", color: "white" }}
            />
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default EmployeeNav;
