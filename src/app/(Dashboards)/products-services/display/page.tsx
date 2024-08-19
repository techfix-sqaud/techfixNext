"use client";
import {
  _getCategories,
  _getProducts,
  _getServices,
} from "@/components/API/adminServices";
import { useSearch } from "@/components/contexts/SearchContext";
import { Products } from "@/components/contexts/types/Products";
import CardTitle from "@/components/UI/cardTitle";
import TechfixTable from "@/components/UI/Tables/TableOne";
import React, { useEffect, useMemo, useState } from "react";

const ViewServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const services = await _getServices();
        console.log("pro", services);
        setServices(services);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getProduct();
  }, []);
  const filteredProducts = useMemo(() => {
    return services?.filter((serv) =>
      Object.values(serv).some((value) => {
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
  }, [services, searchQuery]);

  const columns = services?.length > 0 ? Object.keys(services[0]) : [];
  return (
    <div className="justify-center ">
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <CardTitle baseName="Products" pageName={"Categories"} />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:p-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 flex justify-center ">
        <div className="col-span-12 xl:col-span-12 justify-center px-3 ">
          <TechfixTable
            rows={filteredProducts}
            tableHeader="Services"
            columns={columns}
            pageSize={5}
            haveOrderStatus={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewServices;
