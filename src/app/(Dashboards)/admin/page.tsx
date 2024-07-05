"use client";
import TopHeaderAdmin from "@/components/UI/headerandfooter/topHeaderAdmin";
import Sidebar from "@/components/UI/headerandfooter/sideNavBar";
import { FC, ReactNode } from "react";
import CardDataStats from "@/components/UI/CardDataStats";
import DataCard from "@/components/UI/DataCard";

const page = () => {
  return (
    <>
      <DataCard />
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default page;
