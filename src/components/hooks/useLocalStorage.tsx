"use client";
import { useState, useEffect } from "react";

const UseLocalStorage = (key: any, initialValue: any) => {
  // Function to retrieve an initial value from localStorage or use initialValue
  const getInitialValue = () => {
    try {
      const storedValue =
        typeof window !== "undefined" ? localStorage.getItem(key) : null;
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error retrieving localStorage key '${key}':`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getInitialValue);
  const updateValue = (newValue: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error(`Error updating localStorage key '${key}':`, error);
    }
  };
  useEffect(() => {
    const storedValue = getInitialValue();
    if (storedValue !== value) {
      setValue(storedValue);
    }
  }, [key, initialValue]);
  return [value, updateValue];
};

export default UseLocalStorage;
