"use client";
// components/CustomModal.tsx

import React from "react";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  contentToDisplay: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  contentToDisplay,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Modal Title</h2>
          <p className="text-sm mb-4">{contentToDisplay}</p>
        </div>
        <div className="absolute top-0 right-0 pt-2 pr-4">
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
