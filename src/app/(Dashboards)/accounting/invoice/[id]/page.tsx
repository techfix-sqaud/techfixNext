"use client";
import Invoice from "@/components/UI/InvoiceQuote";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  const billNumber = Number(id);

  return <Invoice billNumber={billNumber} />;
};

export default Page;
