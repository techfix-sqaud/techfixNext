"use client";
import Alert from "@/components/helpers/Alert";
import ProgressBar from "@/components/helpers/PrograssBar";
import TechFixAPI from "@/components/helpers/techfixAPI";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface TrackModalProps {
  onHide: () => void;
}

const TrackModal: React.FC<TrackModalProps> = (props) => {
  const [percentage, setPercentage] = useState<number>();
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const TrackOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const orderStatusRes = await TechFixAPI.get(
        `Order/status?orderNumber=${orderNumber}`
      );
      setOrderStatus(orderStatusRes.data.order_Status);
      setErrorMessage("");
      switch (orderStatusRes.data.order_Status) {
        case "Picked up":
          setPercentage(100);
          break;
        case "Ready for pick up":
          setPercentage(98);
          break;
        case "Processing":
          setPercentage(50);
          break;
        case "Pending":
          setPercentage(20);
          break;
        case "Awaiting Parts":
          setPercentage(30);
          break;
        default:
          break;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Order not found.");
        setOrderStatus("");
      } else {
        console.error("Error fetching order status:", error);
        setErrorMessage("An error occurred while fetching order status.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetStates = () => {
    setPercentage(undefined);
    setOrderStatus("");
    setOrderNumber("");
    setLoading(false);
    setErrorMessage("");
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Track your order</h1>
          </div>
          <div className="max-w-sm mx-auto">
            <form onSubmit={TrackOrder}>
              {errorMessage && <Alert type="error" message={errorMessage} />}
              <div className="mb-4">
                <label
                  className="block text-white-700 text-sm font-bold mb-1"
                  htmlFor="orderNumber"
                >
                  Order number
                </label>
                <input
                  id="orderNumber"
                  type="text"
                  className="form-input w-full text-white-700"
                  placeholder="Order number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    className="btn text-white bg-blue-600 hover:bg-gray-700 w-full"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Tracking..." : "Track"}
                  </button>
                </div>
              </div>
            </form>
            {orderStatus && (
              <div className="text-gray-400 text-center mt-6">
                {/* <h1 className="text-gray-400">{orderStatus}</h1> */}
                <ProgressBar percentage={percentage} status={orderStatus} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackModal;
