"use client";
import AuthContext from "@/components/contexts/AuthContext";
import CardTitle from "@/components/UI/cardTitle";
import TableOne from "@/components/UI/Tables/TableOne";
import React, { useContext } from "react";

const Page = () => {
  const { userProfile } = useContext(AuthContext)!;
  return (
    <div className="justify-center ">
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <CardTitle
          baseName="users"
          pageName={userProfile.role === "EMPLOYEE" ? `Customers` : "Users"}
        />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:p-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 flex justify-center ">
        <div className="col-span-12 xl:col-span-12 justify-center px-3 ">
          <TableOne />
        </div>
      </div>
    </div>
  );
};
export default Page;
