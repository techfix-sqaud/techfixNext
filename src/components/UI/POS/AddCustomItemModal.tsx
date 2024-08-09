"use client";
import { useState } from "react";

interface AddCustomItemModalProps {
  setCustomProduct: (value: string[]) => void;
  setUserEnteredCost: (value: number) => void;
  onClose?: () => void;
  error: string;
  addTocart?: () => void;
  onCalculateChange?: (amountPaid: number, change: number) => void;
}

const AddCustomItemModal = ({
  onClose,
  addTocart,
  error,
  setCustomProduct,
  setUserEnteredCost,
}: AddCustomItemModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Custom item
        </h2>

        <input
          type="text"
          placeholder="Item"
          onChange={(e) => setCustomProduct([e.target.value])}
          className={`border rounded p-2 my-2 w-full text-gray-900 dark:text-black ${
            error ? "border-danger" : ""
          }`}
        />
        <input
          type="number"
          placeholder="Cost"
          onChange={(e) => setUserEnteredCost(Number(e.target.value))}
          className={`border rounded p-2 my-2 w-full text-gray-900 dark:text-black ${
            error ? "border-danger" : ""
          }`}
        />
        {error && <div className="text-danger text-sm my-2">{error}</div>}
        <div className="flex justify-between my-4">
          <button
            onClick={addTocart}
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
    </div>
  );
};

export default AddCustomItemModal;
