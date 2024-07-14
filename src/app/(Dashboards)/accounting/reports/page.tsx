"use client";
import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import AuthContext from "@/components/contexts/AuthContext";
import TechFixAPI from "@/components/helpers/techfixAPI";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { _salesTotal } from "@/components/API/adminServices";
import { useRouter } from "next/navigation";
import { SalesRecord } from "@/components/contexts/types/SalesRecord";
const SalesReport = () => {
  const router = useRouter();
  const { userProfile } = useContext(AuthContext)!;
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [totalIncome, setTotalIncome] = useState<number>();
  const [salesTax, setSalesTax] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const salesPerPage = 5;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await TechFixAPI.get("sales");
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSalesDataByDates = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    try {
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();
      const income = await _salesTotal(startDate, endDate);
      const response = await TechFixAPI.get("sales/customDate", {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      setSalesData(response.data);
      setTotalIncome(income?.data.totalIncome);
      setSalesTax(income?.data.totalTax);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDateChange = (newValue: Date | null) => {
    if (!endDate && newValue) {
      setDateError("End date must be selected");
    } else if (endDate && newValue && newValue > endDate) {
      setDateError("Start date must be before or equal to end date");
    } else {
      setDateError(null);
    }
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Date | null) => {
    if (!startDate && newValue) {
      setDateError("Start date must be selected before selecting an end date");
    } else if (startDate && newValue && newValue < startDate) {
      setDateError("End date must be after or equal to start date");
    } else {
      setDateError(null);
    }
    setEndDate(newValue);
  };

  const handleIssueRefund = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to issue a refund?"
    );
    if (confirmed) {
      try {
        const issueRefund = await TechFixAPI.put(`sales/issueRefund/${id}`);
        if (issueRefund) {
          toast.success("Successfully refunded!");
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const handleGenerateInvoice = async (invoiceNumber: number) => {
    router.push(`/accounting/invoice/${invoiceNumber}`);
  };

  useEffect(() => {
    if (!dateError) {
      if (startDate && endDate) {
        fetchSalesDataByDates(startDate, endDate);
      } else {
        if (userProfile.role === "EMPLOYEE") {
          const today = new Date();
          today.setUTCHours(0, 0, 0, 0);
          fetchSalesDataByDates(today, today);
        } else {
          fetchData();
        }
      }
    }
  }, [startDate, endDate, userProfile.role]);

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleStartDateSelect = (date: Date | null) => {
    setStartDate(date);
    handleStartDateChange(date);
  };

  const handleEndDateSelect = (date: Date | null) => {
    setEndDate(date);
    handleEndDateChange(date);
  };

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = salesData.slice(indexOfFirstSale, indexOfLastSale);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-10 text-blue-900 ">
      <div className="bg-white p-5 rounded-lg shadow-md dark:bg-boxdark">
        <div className="text-center text-2xl font-bold mb-5 dark:bg-boxdark dark:text-white">
          {startDate && endDate
            ? `Sales Report between ${startDate.toLocaleDateString()} and ${endDate.toLocaleDateString()}`
            : "Sales Report"}
        </div>
        {userProfile.role === "ADMIN" && (
          <div className="flex justify-center space-x-5 mb-5 dark:bg-boxdark">
            <div className="w-1/3">
              <input
                type="date"
                value={startDate ? startDate.toISOString().substr(0, 10) : ""}
                onChange={(e) =>
                  handleStartDateChange(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
                className="w-full p-2 border rounded"
              />
              {dateError && (
                <p className="text-danger text-center">{dateError}</p>
              )}
            </div>
            <div className="w-1/3">
              <input
                type="date"
                value={endDate ? endDate.toISOString().substr(0, 10) : ""}
                onChange={(e) =>
                  handleEndDateChange(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-boxdark dark:text-white">
            <tbody>
              {startDate && endDate && (
                <tr>
                  <td colSpan={3} className="text-center py-2">
                    Total income: {totalIncome?.toFixed(2)} Total salesTax:{" "}
                    {salesTax?.toFixed(2)}
                  </td>
                </tr>
              )}
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-2">
                    <LoadingOverlay />
                  </td>
                </tr>
              ) : dateError ? null : salesData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-2">
                    <h1>No Sales found.</h1>
                  </td>
                </tr>
              ) : (
                currentSales.map((salesRecord) => (
                  <tr key={salesRecord.id}>
                    <td className="border px-4 py-2">
                      <details open={salesRecord.isExpanded}>
                        <summary
                          className="flex items-center cursor-pointer"
                          onClick={() => {
                            salesRecord.isExpanded = !salesRecord.isExpanded;
                          }}
                        >
                          Invoice {salesRecord.billNumber}
                          <span className="ml-auto">
                            {salesRecord.isExpanded ? (
                              <BsFillArrowDownCircleFill className="text-blue-900" />
                            ) : (
                              <BsFillArrowRightCircleFill className="text-blue-900" />
                            )}
                          </span>
                        </summary>
                        <div>
                          <ul>
                            {salesRecord.salesItems.map((item) => (
                              <li
                                key={item.id}
                                className="flex justify-between"
                              >
                                <span>{item.productName}</span>
                                <span>Quantity: {item.quantity}</span>
                                <span>Unit Price: ${item.unitPrice}</span>
                                <span>Total Price: ${item.totalPrice}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex justify-between mt-2">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                              onClick={() =>
                                handleGenerateInvoice(salesRecord.billNumber)
                              }
                            >
                              Generate Invoice
                            </button>
                            {userProfile.role === "ADMIN" && (
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => {
                                  if (salesRecord.status === "REFUNDED") {
                                    toast.info(
                                      "This sale is already refunded."
                                    );
                                  } else {
                                    handleIssueRefund(salesRecord.id);
                                  }
                                }}
                              >
                                Issue Refund
                              </button>
                            )}
                          </div>
                          <div className="mt-2">
                            <p>Tax: {salesRecord.tax.toFixed(2)}</p>
                            <p>Status: {salesRecord.status}</p>
                            <p>SubTotal: {salesRecord.subtotal.toFixed(2)}</p>
                            <p>Total: {salesRecord.total.toFixed(2)}</p>
                            <p>Date: {salesRecord.saleDate}</p>
                          </div>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-5">
          {/* <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => handlePageChange( currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 ml-2 rounded"
            onClick={() => handlePageChange(null, currentPage + 1)}
            disabled={indexOfLastSale >= salesData.length}
          >
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
