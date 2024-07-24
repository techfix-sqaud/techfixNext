"use client";
import TopHeaderAdmin from "@/components/UI/headerandfooter/topHeaderAdmin";
import Sidebar from "@/components/UI/headerandfooter/sideNavBar";
import { FC, ReactNode, useEffect, useState } from "react";
import CardDataStats from "@/components/UI/CardDataStats";
import DataCard from "@/components/UI/DataCard";
import TableOne from "@/components/UI/Tables/TableOne";
import { _deleteOrder, _getOrders } from "@/components/API/adminServices";
import TechfixTable from "@/components/UI/Tables/TableOne";
import TechFixAPI from "@/components/helpers/techfixAPI";
import { toast } from "react-toastify";
import { UserData } from "@/components/contexts/types/UserData";
import { _getUsers } from "@/components/API/generalServices";
import { useRouter } from "next/navigation";

const Page = () => {
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
  });
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

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <DataCard />
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:p-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-8">
            <TechfixTable
              rows={ordersData}
              tableHeader="Orders"
              columns={Object.keys(ordersData[0] || {})}
              pageSize={5}
              onEdit={handleOrderEdit}
              onDelete={handleOrderDelete}
              onChangeStatus={onChangeStatus}
              haveOrderStatus={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
