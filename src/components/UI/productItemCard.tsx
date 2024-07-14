import React, { useState, useEffect } from "react";
import TechFixAPI from "../helpers/techfixAPI";
import { Products } from "../contexts/types/Products";

interface ProductItemCardProps {
  product: Products;
  onAddToCart: (item: any) => void;
}

const ProductItemCard: React.FC<ProductItemCardProps> = ({
  product,
  onAddToCart,
}) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div
      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white h-16"
      onClick={handleAddToCart}
    >
      <div className="flex-1 ms-3 whitespace-nowrap">{product.productName}</div>
      <div>{(product.cost + product.labor).toFixed(2)}</div>
    </div>
  );
};

export default ProductItemCard;
