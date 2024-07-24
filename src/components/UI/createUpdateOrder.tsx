"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import AuthContext from "../contexts/AuthContext";
import { CustomerData } from "../contexts/types/UserData";
import TechFixAPI from "../helpers/techfixAPI";
import { TAX_RATE } from "../helpers/Enums";
import {
  _createOrder,
  _getOrderById,
  _getUserById,
  _getUsers,
  sendConfirmationEmail,
} from "../API/generalServices";
import HelperMethods from "../helpers/HelperMethods";
import CardTitle from "./cardTitle";
import Alert from "../helpers/Alert";
import { useParams } from "next/navigation";
import { _getOrdersByOrderNumber } from "../API/adminServices";

const CreateUpdateOrder = () => {
  const id = useParams().id;
  const { userProfile } = useContext(AuthContext)!;
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [Customer, setCustomer] = useState<CustomerData[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>("Pending");
  const [cost, setCost] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [signature, setSignature] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [deviceUserName, setDeviceUserName] = useState<string>("");
  const [devicePassword, setDevicePassword] = useState<string>("");
  const [deviceModel, setDeviceModel] = useState<string>("");
  const [orderDescription, setOrderDesciption] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(true);
  const orderDate = new Date();
  const formattedDate = orderDate.toISOString();
  const DisplayDate = orderDate.toLocaleDateString();
  const [numDevices, setNumDevices] = useState<number>(1);
  const [deviceLabels, setDeviceLabels] = useState<JSX.Element[]>([]);
  console.log("order", id);
  const fetchData = async () => {
    try {
      setLoading(true);
      if (id) {
        const res = await _getOrdersByOrderNumber(id);
        console.log("res", res);
        const customer = await _getUserById(res.userId);
        setOrderNumber(res.orderNumber);
        setDeviceModel(res.deviceModel);
        setOrderDesciption(res.description);
        setCustomerData(customer);
      } else {
        const customerResponse = await _getUsers();
        const UserData = customerResponse?.data.filter(
          (user: { role: string }) => user.role === "CUSTOMER"
        );
        setCustomer(UserData);
      }
      //}
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getExistingBillNumber = async () => {
      try {
        const response = await TechFixAPI.get("/order/orderNumber");
        const maxOrderNumber = response.data.maxOrderNumber;
        const nextOrderCounter = maxOrderNumber + 1;
        setOrderNumber(nextOrderCounter);
      } catch (error) {
        console.error("Error fetching invoice number:", error);
      }
    };
    {
      !id && getExistingBillNumber();
    }
    fetchData();
  }, []);

  useEffect(() => {
    const calculatedTax = cost * TAX_RATE;
    const calculatedTotal = cost - discount + calculatedTax;
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [cost, discount]);

  const handleCustomerSelect = (value: any) => {
    if (value) {
      setCustomerData(value);
      setShowList(false);
    }
  };

  const handleNumDevicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumDevices = parseInt(e.target.value) || 1;
    setNumDevices(newNumDevices);
  };

  useEffect(() => {
    const labels = Array.from({ length: numDevices }, (_, index) => (
      <div key={index} className="label">
        <div className="label-content">
          <div>Order number: {orderNumber}</div>
          <div>
            Device {index + 1} of {numDevices}
          </div>
        </div>
      </div>
    ));
    setDeviceLabels(labels);
  }, [numDevices, orderNumber]);

  const orderData = {
    userId: customerData?.id,
    OrderNumber: orderNumber,
    CreatedBy: userProfile.userId,
    FirstName: customerData?.firstName,
    LastName: customerData?.last_name,
    mobile: customerData?.mobile,
    email: customerData?.email,
    Order_Status: orderStatus,
    subtotal: cost,
    total: total.toFixed(2),
    Tax: tax.toFixed(2),
    Description: orderDescription,
    Discount_Amount: discount,
    Signature: signature,
    DeviceUserName: deviceUserName,
    DevicePassword: devicePassword,
    DepositAmount: depositAmount,
    CreatedAt: formattedDate,
    SalesItems: null,
  };

  const handleCreateOrder = async () => {
    if (
      !customerData ||
      !deviceModel ||
      !cost ||
      !orderNumber ||
      !orderDescription
    ) {
      toast.error("something went wrong!");
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    const create = await _createOrder(orderData);
    if (create?.status === 201) {
      toast.success("Service Order Created Successfully", { autoClose: 3000 });
      if (customerData.email) {
        const confirmationMessage = `Your order has been successfully created. Your order number is: ${orderNumber}`;
        const confirmationSubject = "Order Confirmation";
        const sendEmail = await sendConfirmationEmail(
          customerData.email,
          confirmationMessage,
          confirmationSubject
        );
      }
      handlePrint();
    } else {
      setErrorMessage("Something went wrong!");
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-270">
        <CardTitle baseName="Orders" pageName={id ? "Update" : "Create"} />
        <div className="p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div className="mainContent">
            {loading && <div>Loading...</div>}

            <div style={{ padding: "3%" }}>
              {errorMessage && <Alert type="error" message={errorMessage} />}
              <div ref={componentRef} style={{ padding: "3%" }}>
                <h4>Techfix</h4>
                Order number: {orderNumber}
                {showList && !id && (
                  <div className="w-full sm:w-1/2">
                    <label htmlFor="customer-select">Customer:</label>
                    <select
                      id="customer-select"
                      className="form-select"
                      onChange={(e) =>
                        handleCustomerSelect(Customer[parseInt(e.target.value)])
                      }
                    >
                      {Customer.map((customer, index) => (
                        <option key={customer.id} value={index}>
                          {customer.firstName} {customer.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {customerData && (
                  <div>
                    <h6>
                      Client information<span className="star">*</span>
                    </h6>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="first-name" className="form-label">
                          First name:
                        </label>
                        <input
                          type="text"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="first-name"
                          value={customerData.firstName || ""}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="last-name" className="form-label">
                          Last name:
                        </label>
                        <input
                          type="text"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="last-name"
                          value={customerData.last_name || ""}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              last_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="email"
                          value={customerData.email || ""}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="phone" className="form-label">
                          Phone number:
                        </label>
                        <input
                          type="tel"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="phone"
                          value={customerData.mobile || ""}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              mobile: HelperMethods.formatFaxAndPhoneNumber(
                                e.target.value
                              ),
                            })
                          }
                        />
                      </div>
                    </div>

                    <h6>
                      Device information<span className="star">*</span>
                    </h6>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="model" className="form-label">
                          Model:
                        </label>
                        <input
                          type="text"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="model"
                          value={deviceModel}
                          onChange={(e) => setDeviceModel(e.target.value)}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="num-devices" className="form-label">
                          Number of devices:
                        </label>
                        <input
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="num-devices"
                          value={numDevices}
                          onChange={(e) => handleNumDevicesChange(e)}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="username" className="form-label">
                          User name:
                        </label>
                        <input
                          type="text"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="username"
                          value={deviceUserName}
                          onChange={(e) => setDeviceUserName(e.target.value)}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="password" className="form-label">
                          Password:
                        </label>
                        <input
                          type="password"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="password"
                          value={devicePassword}
                          onChange={(e) => setDevicePassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="with-charger"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="with-charger"
                        >
                          With Charger
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="without-charger"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="without-charger"
                        >
                          Without Charger
                        </label>
                      </div>
                    </div>
                    <h6>
                      Payment information<span className="star">*</span>
                    </h6>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="cost" className="form-label">
                          Cost:
                        </label>
                        <input
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="cost"
                          value={cost}
                          onChange={(e) => setCost(parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="tax" className="form-label">
                          Tax:
                        </label>
                        <input
                          type="text"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="tax"
                          value={tax.toFixed(2)}
                          readOnly
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="discount" className="form-label">
                          Discount:
                        </label>
                        <input
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="discount"
                          value={discount}
                          onChange={(e) =>
                            setDiscount(parseFloat(e.target.value))
                          }
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="total" className="form-label">
                          Total:
                        </label>
                        <input
                          type="text"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="total"
                          value={total.toFixed(2)}
                          readOnly
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="deposit-amount" className="form-label">
                          Deposit amount:
                        </label>
                        <input
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="deposit-amount"
                          value={depositAmount}
                          onChange={(e) =>
                            setDepositAmount(parseFloat(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
                <h6>
                  Issue Description<span className="star">*</span>
                </h6>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    id="description"
                    rows={4}
                    value={orderDescription}
                    onChange={(e) => setOrderDesciption(e.target.value)}
                  />
                </div>
                <div className="servicePolicy">
                  <p>Important Service Center Information</p>
                  <div className="servicePolicyText">
                    <p>
                      <strong>Data Responsibility:</strong> We take pride in our
                      high-quality electronic device repairs but cannot be
                      responsible for data loss during repairs.
                      <strong>Authorization:</strong> We'll inform you by phone
                      if more work is needed and require your verbal approval
                      before proceeding. Once authorized, full payment is due.
                      <strong>Cancellation:</strong> If you cancel a repair,
                      you'll only be charged for work done before cancellation.
                      <strong>Returns & Refunds:</strong> Generally, sales are
                      final. Returns may incur a 20% restocking fee with the
                      original receipt.
                      <strong>Device Pickup:</strong> Retrieve your device
                      within 14 days of repair completion; otherwise, we may
                      dispose of it to cover costs.
                      <strong>Damage Claims:</strong> Report any cosmetic or
                      apparent damage when picking up your device.
                      <strong>Estimates:</strong> Estimates are valid for 7 days
                      from the listed date.
                      <strong>Software Warranty:</strong> We do not provide any
                      software warranties.
                    </p>
                    <strong>
                      Thank you for choosing our service center. Contact us with
                      any questions or concerns.
                    </strong>
                  </div>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms-checkbox"
                    required
                  />
                  <label className="form-check-label" htmlFor="terms-checkbox">
                    I agree to the terms and conditions
                  </label>
                </div>
                <div>Date: {DisplayDate}</div>
              </div>
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                onClick={() => handleCreateOrder()}
              >
                {!id ? `Create` : `Update`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateOrder;
