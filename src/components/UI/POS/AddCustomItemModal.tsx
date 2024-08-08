"use client";
import { useCallback, useEffect, useState } from "react";

interface ChangeModalProps {
  totalAmount?: number;
  onClose?: () => void;
  onCalculateChange?: (amountPaid: number, change: number) => void;
}

const AddCustomItemModal = ({
  totalAmount = 0,
  onClose,
  onCalculateChange,
}: ChangeModalProps) => {
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<number>(0);

  useEffect(() => {
    const calculatedChange = amountPaid - totalAmount;
    setChange(calculatedChange);
    if (onCalculateChange) {
      onCalculateChange(amountPaid, calculatedChange);
    }
  }, [amountPaid, totalAmount, onCalculateChange]);

  const handleQuickOption = (amount: number) => {
    setAmountPaid(amount);
    setInputValue(amount);
    handleError(amount);
  };

  const getQuickOptions = (amount: number) => {
    if (amount < 20) {
      return [20, 50, 100];
    } else if (amount <= 50) {
      return [50, 100];
    } else {
      const baseAmount = Math.ceil(amount / 50) * 50;
      return [baseAmount, baseAmount + 50, baseAmount + 100];
    }
  };

  const quickOptions = getQuickOptions(totalAmount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
    handleError(parseInt(e.target.value));
  };

  const handleError = (value: number) => {
    if (!isNaN(value)) {
      setAmountPaid(value);
      const calculatedChange = value - totalAmount;
      if (calculatedChange < 0) {
        setError("Amount paid is less than the total amount.");
      } else {
        setError("");
      }
    } else {
      setError("Invalid input. Please enter a number.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Custom item
        </h2>

        <div className="text-lg font-bold text-gray-900 dark:text-gray-100 my-4">
          Total: {totalAmount.toFixed(2)}
        </div>
        <input
          type="number"
          placeholder="Amount Paid"
          value={inputValue}
          onChange={handleInputChange}
          className={`border rounded p-2 my-2 w-full text-gray-900 dark:text-black ${
            error ? "border-danger" : ""
          }`}
        />
        {error && <div className="text-danger text-sm my-2">{error}</div>}
        <button
          onClick={onClose}
          className="flex items-center justify-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 bg-indigo-600 border-transparent text-white p-2 rounded mr-2"
        >
          Add to cart
        </button>

        <button
          onClick={onClose}
          className="flex items-center justify-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 bg-indigo-600 border-transparent text-white p-2 rounded mr-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddCustomItemModal;
