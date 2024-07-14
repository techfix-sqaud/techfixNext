"use client";
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import HelperMethods from "@/components/helpers/HelperMethods";
import { CustomerData } from "@/components/contexts/types/UserData";
import { TAX_RATE } from "@/components/helpers/Enums";
import { _getUsers } from "@/components/API/generalServices";
import { _getSalesByBillNumber } from "@/components/API/adminServices";
import { useParams, useRouter } from "next/navigation";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import {
  AiOutlineFileAdd,
  AiOutlinePrinter,
  AiOutlineSave,
} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import CardTitle from "./cardTitle";
import Dropdown from "./techfixDropdown";
import { Label } from "@headlessui/react";

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
  includeTax: boolean;
  [key: string]: any;
};

interface InvoiceProps {
  billNumber?: undefined | number;
}
const Invoice = ({ billNumber }: InvoiceProps) => {
  const router = useRouter();
  const today = new Date();
  const formattedDate = HelperMethods.formatDate(today);
  const [customerName, setCustomerName] = useState<string>("");
  const [paymentMethod, setPaymnetMethod] = useState<string>("");

  const [billingAddress, setBillingAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "", description: "", quantity: 0, price: 0, includeTax: true },
  ]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const options = customerData.map((customer) => ({
    label: `${customer.firstName} ${customer.last_name}`,
    value: `${customer.firstName} ${customer.last_name}`,
  }));

  const payments = [
    { label: "Not paid", value: "not_paid" },
    { label: "Cash", value: "cash" },
    { label: "Card", value: "card" },
    { label: "Quick pay", value: "quick_pay" },
  ];

  const paymentMethods = payments.map((pay) => ({
    label: pay.label,
    value: pay.value,
  }));

  useEffect(() => {
    const calculateTotal = () => {
      let subtotal = 0;
      let tax = 0;
      let total = 0;

      lineItems.forEach(({ quantity, price, includeTax }) => {
        let itemTotal = quantity * price;
        subtotal += itemTotal;
        if (includeTax) {
          const itemTax = itemTotal * TAX_RATE;
          tax += itemTax;
          itemTotal += itemTax;
        }
      });

      total = subtotal + tax;

      setSubtotal(subtotal);
      setTax(tax);
      setTotal(total);
    };
    calculateTotal();
  }, [lineItems]);

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: "", description: "", quantity: 0, price: 0, includeTax: true },
    ]);
  };

  const handleLineItemChange = (
    index: number,
    field: string,
    value: string | number | boolean
  ) => {
    const newLineItems = [...lineItems];
    newLineItems[index][field] = value;
    setLineItems(newLineItems);
  };

  const handleDeleteLineItem = (index: number) => {
    if (lineItems.length > 1) {
      const newLineItems = [...lineItems];
      newLineItems.splice(index, 1);
      setLineItems(newLineItems);
    } else {
      toast.error("At least one item is required.", { autoClose: 3000 });
    }
  };

  const generateQuoteNumber = () => {
    const min = 10001;
    const max = 11000;
    const randomQuoteNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return `${randomQuoteNumber}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await _getUsers();

      const UserData = response?.data.filter(
        (user: { role: string }) => user.role === "CUSTOMER"
      );
      setCustomerData(UserData);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoiceData = async (billNumber: number) => {
    try {
      if (billNumber) {
      }
      setLoading(true);
      const response = await _getSalesByBillNumber(billNumber);

      const invoiceDataFromResponse = response?.data;

      setCustomerName(invoiceDataFromResponse.customerName || "");
      setBillingAddress(invoiceDataFromResponse.billingAddress || "");

      const mappedLineItems = invoiceDataFromResponse.salesItems.map(
        (salesItem: any) => ({
          id: salesItem.id.toString(),
          description: salesItem.productName,
          quantity: salesItem.quantity,
          price: salesItem.unitPrice,
          includeTax: salesItem.includeTax,
        })
      );

      setLineItems(mappedLineItems || []);
      setSubtotal(invoiceDataFromResponse.subtotal || 0);
      setTax(invoiceDataFromResponse.tax || 0);
      setTotal(invoiceDataFromResponse.total || 0);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (billNumber) {
      fetchInvoiceData(billNumber);
    }
  }, [billNumber]);

  const handleSubmit = async () => {
    const invoiceData = {
      customerName,
      billingAddress,
      lineItems,
      subtotal,
      tax,
      total,
    };

    console.log(invoiceData);
    // Submit the invoice data to the server or handle it as needed
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const displayNumber = billNumber || generateQuoteNumber();

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-270">
        <CardTitle
          baseName="Accounting"
          pageName={billNumber ? "Invoice" : "Quote"}
        />
        <div className="p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
          {loading && <LoadingOverlay />}
          <div className="flex justify-end mt-2 space-x-2">
            <AiOutlineSave
              onClick={handleSubmit}
              style={{ fontSize: "30px" }}
            />
            {!billNumber && (
              <AiOutlineFileAdd
                onClick={handleAddLineItem}
                style={{ fontSize: "30px" }}
              />
            )}

            <AiOutlinePrinter
              onClick={handlePrint}
              style={{ fontSize: "30px" }}
            />
          </div>
          <div
            ref={componentRef}
            className="p-4 bg-gray-100  dark:border-strokedark dark:bg-boxdark"
          >
            <div className="flex justify-between">
              <div>
                <h4 className="text-2xl text-blue-800 dark:text-white">
                  TECHFIX
                </h4>
                <p className="text-blue-800 dark:text-white">
                  Email: support@techfix-raleigh.com
                </p>
                <p className="text-blue-800 dark:text-white">
                  Phone no: 919-301-8950
                </p>
                <p className="text-blue-800 dark:text-white">
                  Address: 2830 capital blvd. Raleigh, NC 27604
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-800 dark:text-white">
                  {billNumber ? "INVOICE NO." : "QUOTE NO."}
                  {displayNumber}
                </p>
                <p className="text-blue-800 dark:text-white">
                  Date: {formattedDate}
                </p>
                <div className="mt-1">
                  <Dropdown
                    label="Payment method"
                    value={paymentMethod}
                    onChange={(selectedValue: string) =>
                      setPaymnetMethod(selectedValue)
                    }
                    options={paymentMethods}
                    placeholder="Payment method"
                    defaultValue={paymentMethod}
                    width="24"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h6 className="text-lg text-blue-800 dark:text-white">
                Bill To:
              </h6>
              <div className="mt-1">
                <Dropdown
                  label="Customer"
                  value={customerName}
                  onChange={(selectedValue: string) =>
                    setCustomerName(selectedValue)
                  }
                  options={options}
                  placeholder="Select a role"
                  defaultValue={customerName}
                />
              </div>
              <div className="mt-4">
                <h6 className="text-lg text-blue-800 dark:text-white">
                  Billing address
                </h6>
                <textarea
                  id="billingAddress"
                  rows={3}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <h6 className="text-lg text-blue-800 dark:text-white">
                Ship to:
              </h6>
              <textarea
                rows={3}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                      Tax
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  {lineItems.map((lineItem, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={lineItem.description}
                          disabled={billNumber ? true : false}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <input
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={lineItem.quantity}
                          disabled={billNumber ? true : false}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <input
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={lineItem.price}
                          disabled={billNumber ? true : false}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {HelperMethods.ccyFormat(
                          lineItem.quantity * lineItem.price
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={lineItem.includeTax}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "includeTax",
                              e.target.checked
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <MdDelete
                          style={{ color: "#c00618" }}
                          onClick={() => handleDeleteLineItem(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 whitespace-nowrap text-right"
                    >
                      <span className="text-lg text-blue-800 dark:text-white">
                        Subtotal: {HelperMethods.ccyFormat(subtotal)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 whitespace-nowrap text-right"
                    >
                      <span className="text-lg text-blue-800 dark:text-white">
                        Tax (7.25%): {HelperMethods.ccyFormat(tax)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 whitespace-nowrap text-right "
                    >
                      <span className="text-lg text-blue-800 dark:text-white">
                        Total: {HelperMethods.ccyFormat(total)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-6  whitespace-nowrap text-center"
                    >
                      <span className="text-xl text-blue-800 dark:text-white">
                        THANKS FOR YOUR BUSINESS!
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
