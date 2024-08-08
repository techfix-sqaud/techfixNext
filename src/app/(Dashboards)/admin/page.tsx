"use client";
import TopHeaderAdmin from "@/components/UI/headerandfooter/topHeaderAdmin";
import Sidebar from "@/components/UI/headerandfooter/sideNavBar";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import CardDataStats from "@/components/UI/CardDataStats";
import DataCard from "@/components/UI/DataCard";
import TableOne from "@/components/UI/Tables/TableOne";
import { _deleteOrder, _getOrders } from "@/components/API/adminServices";
import TechfixTable from "@/components/UI/Tables/TableOne";
import TechFixAPI from "@/components/helpers/techfixAPI";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import MessageCard from "@/components/UI/Messages";
import { useSearch } from "@/components/contexts/SearchContext";
import AdCard from "@/components/UI/AdCard";
import ColumnChart from "@/components/UI/charts/ColumnChart";
import Chart from "@/components/UI/charts/Chart";
import dynamic from "next/dynamic";

const CircularChart = dynamic(
  () => import("@/components/UI/charts/CircularChart"),
  {
    ssr: false,
  }
);
const Page = () => {
  const { searchQuery } = useSearch();
  const navigate = useRouter();
  const [ordersData, setOrdersData] = useState([]);

  const fetchOrderData = async () => {
    try {
      const response = await _getOrders();
      setOrdersData(response?.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const onChangeStatus = async (row: { orderNumber: any }, newStatus: any) => {
    const updateStatus = await TechFixAPI.put(
      `Order/updateOrderStatus?orderNumber=${row.orderNumber}&newStatus=${newStatus}`
    );
    if (updateStatus.status === 200) {
      toast.success("Order status updated successfully", {
        autoClose: 3000,
      });
      fetchOrderData();
    }
  };

  const handleOrderEdit = (row: { orderNumber: any; row: { userId: any } }) => {
    navigate.push(`/sales/orders/${row?.orderNumber}`);
  };

  const handleOrderDelete = async (row: any) => {
    const deleteOrder = await _deleteOrder(row.id);
    if (deleteOrder?.status === 204) {
      toast.success("Order deleted successfully", {
        autoClose: 3000,
      });
      fetchOrderData();
    }
  };

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) =>
      Object.values(order).some((value) => {
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
  }, [ordersData, searchQuery]);

  const columns = ordersData?.length > 0 ? Object.keys(ordersData[0]) : [];

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-4 md:p-6">
      <main>
        <div className="mx-auto max-w-screen-2xl">
          <DataCard />
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ColumnChart />
          <Chart />
          <CircularChart />
          <AdCard />
          <div className="col-span-12 xl:col-span-8">
            <TechfixTable
              rows={filteredOrders}
              tableHeader="Orders"
              columns={columns}
              pageSize={5}
              onEdit={handleOrderEdit}
              onDelete={handleOrderDelete}
              onChangeStatus={onChangeStatus}
              haveOrderStatus={true}
            />
          </div>
          <MessageCard />
        </div>
      </main>
    </div>
  );
};

export default Page;
