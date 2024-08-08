"use client";
import { _getUsers } from "@/components/API/generalServices";
import AuthContext from "@/components/contexts/AuthContext";
import { useSearch } from "@/components/contexts/SearchContext";
import { UserData } from "@/components/contexts/types/UserData";
import CardTitle from "@/components/UI/cardTitle";
import TechfixTable from "@/components/UI/Tables/TableOne";
import React, { useContext, useEffect, useState, useMemo } from "react";

const Page = () => {
  const { userProfile } = useContext(AuthContext)!;
  const { searchQuery } = useSearch();
  const [usersData, setUsersData] = useState<UserData[]>([]);

  const fetchOrderData = async () => {
    try {
      const response = await _getUsers();
      const filteredData = response?.data.map((user: UserData) => ({
        firstName: user.firstName,
        middleName: user.middleName,
        last_Name: user.last_name,
        mobile: user.mobile,
        email: user.email,
        last_login: user.last_login,
        profile: user.profile,
        signature: user.signature,
        registered_at: user.registered_at,
        role: user.role,
      }));
      setUsersData(filteredData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) =>
      Object.values(user).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (typeof value === "number") {
          return value.toString().includes(searchQuery);
        }
        // Add more conditions for other data types if necessary
        return false;
      })
    );
  }, [usersData, searchQuery]);

  const tableHeader = userProfile.role === "EMPLOYEE" ? "Customers" : "Users";

  function handleOrderEdit(row: any): void {
    throw new Error("Function not implemented.");
  }

  function handleOrderDelete(row: any): void {
    throw new Error("Function not implemented.");
  }

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
          <TechfixTable
            rows={filteredUsers}
            columns={Object.keys(filteredUsers[0] || {})}
            pageSize={10}
            tableHeader={tableHeader}
            onEdit={handleOrderEdit}
            onDelete={handleOrderDelete}
            haveOrderStatus={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
