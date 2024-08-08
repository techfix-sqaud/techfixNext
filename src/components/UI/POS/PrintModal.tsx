"use clinet";
import React from "react";
interface PrintModalProps {
  onClose: () => void;
  onPrintReceipt: (print: boolean) => void;
}

const PrintModal = ({ onClose, onPrintReceipt }: PrintModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Print Receipt
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Do you want to print a receipt?
        </p>
        <div className="mt-4">
          <button
            onClick={() => onPrintReceipt(true)}
            className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
          >
            Yes
          </button>

          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded ml-2 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
