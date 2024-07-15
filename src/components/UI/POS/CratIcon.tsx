import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface CartIconProps {
  itemCount: number;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => (
  <div className="relative z-50">
    <FaShoppingCart style={{ fontSize: 25 }} />
    {itemCount > 0 && (
      <div className="absolute -top-4 -right-4 bg-danger rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
        {itemCount}
      </div>
    )}
  </div>
);

export default CartIcon;
