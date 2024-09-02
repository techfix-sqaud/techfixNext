"use client";
import { useCallback, useEffect, useState } from "react";

interface ChangeModalProps {
  totalAmount: number;
  onClose: () => void;
  onDone: () => void;
  onCalculateChange: (amountPaid: number, change: number) => void;
}

const ChangeModal = ({
  totalAmount,
  onClose,
  onDone,
  onCalculateChange,
}: ChangeModalProps) => {
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<number>(0);

  useEffect(() => {
    const calculatedChange = amountPaid - totalAmount;
    setChange(calculatedChange);
    onCalculateChange(amountPaid, calculatedChange);
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
          Change
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
        {error && (
          <div className="text-danger text-sm my-2 col-span-2">{error}</div>
        )}
        <div className="flex justify-between my-4 col-span-2">
          {quickOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleQuickOption(option)}
              className="flex items-center justify-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 bg-indigo-600 border-transparent text-white p-2 rounded mr-2"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="text-lg font-bold text-gray-900 dark:text-gray-100 my-4 col-span-2">
          Change: {change >= 0 && change.toFixed(2)}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 bg-indigo-600 border-transparent text-white p-2 rounded mr-4"
          >
            Close
          </button>

          <button
            onClick={onDone}
            className="flex items-center justify-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 bg-indigo-600 border-transparent text-white p-2 rounded"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeModal;
