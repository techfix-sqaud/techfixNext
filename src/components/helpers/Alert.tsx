import React from "react";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertStyles = {
    success: "bg-success border border-success text-white",
    error: "bg-danger border border-danger text-white",
  };

  return (
    <div
      className={`mb-4 px-4 py-3 rounded relative ${alertStyles[type]}`}
      role="alert"
    >
      <strong className="font-bold">
        {type === "success" ? "Great!" : "Oops!"}
      </strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
};

export default Alert;
