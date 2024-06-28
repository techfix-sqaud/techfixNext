"use client";
import React, { useState, FC, ChangeEvent, FocusEvent } from "react";

interface InputWithErrorProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputWithError: FC<InputWithErrorProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="w-full xl:w-1/2">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded border-[1.5px] px-5 py-3 outline-none transition ${
          error
            ? "border-red-500"
            : "border-stroke focus:border-primary active:border-primary"
        } bg-transparent text-black dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputWithError;
