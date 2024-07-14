import React, { useEffect, useRef, useState } from "react";

interface AutocompleteProps {
  label?: string;
  value: any;
  defaultValue?: any;
  onChange: (value: string) => void;
  options: { label: string; value: number | string }[];
  placeholder?: string;
  width?: "full" | string; // Allow "full" or specific width as string
}

const Dropdown: React.FC<AutocompleteProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  options,
  placeholder = "",
  width = "full", // Default to full width if not specified
}) => {
  const [inputValue, setInputValue] = useState(defaultValue ?? "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    // Filter options based on input value
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);

    // Show dropdown if there are filtered options
    setShowDropdown(filtered.length > 0);
  };

  const handleOptionClick = (selectedValue: string) => {
    setInputValue(selectedValue);
    setShowDropdown(false);
    onChange(selectedValue);
  };

  return (
    <div className={`w-${width} relative`}>
      {label && (
        <label
          htmlFor="autocomplete"
          className={`w-full block text-gray-700 mb-1 dark:text-white`}
        >
          {label}
        </label>
      )}
      <input
        className={`w-full rounded border border-gray-300 bg-gray-100 py-3 pl-3 pr-2 text-gray-900 focus:border-primary focus-visible:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:focus:border-primary`}
        type="text"
        name="autocomplete"
        id="autocomplete"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white shadow-lg dark:bg-gray-800"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
              onClick={() => handleOptionClick(option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
