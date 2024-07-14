"use client";
import TopHeaderAdmin from "@/components/UI/headerandfooter/topHeaderAdmin";
import Sidebar from "@/components/UI/headerandfooter/sideNavBar";
import { FC, ReactNode } from "react";
import CardDataStats from "@/components/UI/CardDataStats";
import DataCard from "@/components/UI/DataCard";
import TableOne from "@/components/UI/Tables/TableOne";

const page = () => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <DataCard />
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:p-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-8">
            <TableOne />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
