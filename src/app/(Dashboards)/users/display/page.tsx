"use client";
import AuthContext from "@/components/contexts/AuthContext";
import CardTitle from "@/components/UI/cardTitle";
import TableOne from "@/components/UI/Tables/TableOne";
import React, { useContext } from "react";

const Page = () => {
  const { userProfile } = useContext(AuthContext)!;
  return (
    <div className="flex justify-center">
      <div className="mx-auto max-w-270">
        <CardTitle
          baseName="users"
          pageName={userProfile.role === "EMPLOYEE" ? `Customers` : "Users"}
        />

        <div className="col-span-5 xl:col-span-3 mx-auto">
          <TableOne />
        </div>
      </div>
    </div>
  );
};
export default Page;
