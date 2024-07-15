import TechFixAPI from "@/components/helpers/techfixAPI";
import React, { useState, useEffect } from "react";

interface CategoryCardProps {
  id: number;
  title: string;
  category: string;
  selectedCategoryId: undefined | number;
  onCategoryClick: (categoryId: number) => void; // Add this prop
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  category,
  selectedCategoryId,
  onCategoryClick, // Destructure this prop
}) => {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCategoryId) fetchProductsByService(selectedCategoryId);
  }, [selectedCategoryId]);

  const fetchServicesByCategory = async (categoryId: number) => {
    try {
      const response = await TechFixAPI.get(
        `Products/getServiceNamebyCategoryId/${categoryId}`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchProductsByService = async (categoryId: number) => {
    try {
      const response = await TechFixAPI.get(
        `Products/getproductbycategoriesid/${categoryId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(
      services.find((service) => service.serviceId === serviceId)
    );
    fetchProductsByService(serviceId);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div
      className="w-120 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white h-16 relative"
      onClick={() => onCategoryClick(id)} // Add this line
    >
      <div className="w-120 flex-1 ms-3 whitespace-nowrap">{title}</div>
    </div>
  );
};

export default CategoryCard;
