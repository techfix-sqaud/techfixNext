"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import barcode from "../Assets/barcode.png";

interface CartItem {
  id: number;
  productName: string;
  cost: number;
  labor: number;
  quantity: number;
  imageUrl?: any;
}

interface CartProps {
  cart: CartItem[];
  handleIncreaseQuantity: (index: number) => void;
  handleDecreaseQuantity: (index: number) => void;
  handleUpdateQuantity: (index: number, newQuantity: number) => void;
  handleOnDelete: (index: number) => void;
  subTotal: number;
  totalTaxAmount: number;
  totalInvoiceAmount: number;
  discountPercentage: number;
  errorMessage: string;
  successMessageForList: string;
  handleCheckout: (paymentMethod: string) => void;
  clearCart: () => void;
  invoiceNumber: number;
  UserState: { firstName: string };
  shop: any;
}

const Cart: React.FC<CartProps> = ({
  cart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleUpdateQuantity,
  handleOnDelete,
  subTotal,
  totalTaxAmount,
  totalInvoiceAmount,
  discountPercentage,
  errorMessage,
  successMessageForList,
  handleCheckout,
  clearCart,
  invoiceNumber,
  UserState,
  shop,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: 80mm auto; /* POS printer size */
        margin: 5mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          font-size: 10px;
        }
        .no-print {
          display: none;
        }
        .headerOfBill, .User {
          text-align: center;
          margin-bottom: 5px;
        }
        .headerOfBill div, .User div {
          margin-bottom: 3px;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
          padding: 5px 0;
        }
        .cart-item img {
          width: 40px;
          height: 40px;
        }
        .footer {
          text-align: center;
          margin-top: 10px;
        }
        .totals {
          margin-top: 10px;
        }
        .totals div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
        }
      }
    `,
  });

  const computedValues = useMemo(() => {
    let subTotal = 0;
    let totalTaxAmount = 0;
    let totalInvoiceAmount = 0;

    cart.forEach((item) => {
      const itemTotal = (item.cost + item.labor) * item.quantity;
      subTotal += itemTotal;
      totalTaxAmount += itemTotal * 0.07;
    });

    totalInvoiceAmount = subTotal + totalTaxAmount;

    return { subTotal, totalTaxAmount, totalInvoiceAmount };
  }, [cart]);

  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
      <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
        <div className="flex h-full flex-col overflow-y-scroll dark:bg-boxdark text-blue-900 bg-white dark:text-white shadow-xl ">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <div className="ml-3 flex h-7 items-center"></div>
            </div>

            <div className="mt-8">
              <div ref={componentRef}>
                <div className="headerOfBill text-center mb-4">
                  Techfix <br />
                  {shop?.address} {shop?.city} {shop?.state} {shop?.zipCode}
                  <br />
                  www.techfix-raleigh.com
                  <br />
                  (919)-301-8950
                  <div>Invoice Number: {invoiceNumber}</div>
                </div>
                <div className="User font-bold text-center mt-2">
                  Cashier: {UserState.firstName}
                </div>
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.map((item, index) => (
                    <li key={item.id} className="cart-item flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.imageUrl || barcode}
                          alt={item.productName}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3>{item.productName}</h3>
                            <p className="ml-4">
                              {(item.cost + item.labor).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </button>
                            <input
                              className="w-10 text-center mx-2 dark:bg-boxdark"
                              value={item.quantity}
                              onChange={(e) =>
                                handleUpdateQuantity(
                                  index,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <button
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleOnDelete(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {errorMessage && (
                  <div className="text-red-500 mt-4">{errorMessage}</div>
                )}
                {successMessageForList && (
                  <div className="text-green-500 mt-4">
                    {successMessageForList}
                  </div>
                )}
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>${computedValues.subTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium">
                  <p>Total</p>
                  <p>${computedValues.totalInvoiceAmount.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Tax: ${computedValues.totalTaxAmount.toFixed(2)}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Discount: {discountPercentage}%
                </p>
                <div className="mt-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">
                    Thank you for your business!
                  </h3>
                  <p className="text-sm">Low price guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleCheckout("cash")}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout Cash
              </button>
              <button
                onClick={() => handleCheckout("card")}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout Card
              </button>
              <button
                onClick={() => handleCheckout("Other")}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout Other
              </button>
              <button
                onClick={clearCart}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 col-span-2"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
