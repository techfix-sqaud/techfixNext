"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../contexts/AuthContext";
import TechFixAPI from "../../helpers/techfixAPI";
import CategoryCard from "./PosItemCard";
import Cart from "./PosCart";
import ProductItemCard from "../productItemCard";
import { BsFilterLeft } from "react-icons/bs";
import Modal from "../modal";
import { discount, TAX_RATE } from "../../helpers/Enums";
import Dropdown from "../techfixDropdown";
import { FaShoppingCart } from "react-icons/fa";
import CartIcon from "./CratIcon";

const Pos = () => {
  const currentDate = new Date();
  const { userProfile } = useContext(AuthContext)!;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);
  // const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [productsItems, setProductsItems] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [listOfProducts, setListOfProducts] = useState<any[]>([]);
  const [shop, setShop] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const [customItemErrorMessage, setCustomItemErrorMessage] =
  //   useState<string>("");
  // const [errorMessageForList, setErrorMessageForList] = useState<string>("");
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [showServices, setShowServices] = useState<boolean>(false);
  const [invoiceNumber, setInvoiceNumber] = useState(10000);
  const [subTotal, setSubTotal] = useState(0);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [successMessageForList, setSuccessMessageForList] =
    useState<string>("");
  const [discountOption, setDiscountOption] = useState<any>(0);
  //const [discountPercentage, setDiscountPercentage] = useState<any>(0);
  const [discountAmount, setDiscountAmount] = useState<any>(0);
  // const [expandedItems, setExpandedItems] = useState<number | null>(null);
  // const [showCostModal, setShowCostModal] = useState<boolean>(false);
  // const [customProduct, setCustomProduct] = useState<string[]>([""]);
  // const [userEnteredCost, setUserEnteredCost] = useState<number[]>([0]);
  // const [userEnteredLabor, setUserEnteredLabor] = useState<number[]>([0]);
  // const [notes, setNotes] = useState<string[]>([""]);
  // const [isCustomItem, setIsCustomItem] = useState<boolean>(false);
  // const [successMessage, setSuccessMessage] = useState<string>("");
  const [isCartVisible, setIsCartVisible] = useState(false);
  // const [currentUser, setCurrentUser] = useState<{ firstName: string }>({
  //   firstName: "",
  // });
  const totalItemQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const discountPercentage = discount.map((pay) => ({
    label: `${pay.label}`, // Convert value to string if needed
    value: pay.value,
  }));
  useEffect(() => {
    getProducts();
    getShop();
  }, []);

  const handleAddToCart = (item: any) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart((prevCart) => [...prevCart, newItem]);
    }

    setSuccessMessageForList("Item added to cart!");
  };

  const handleOnDelete = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalContent, setModalContent] = useState("");

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setIsCartVisible(false);
    }
  };
  useEffect(() => {
    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);
  // const handleModalOpen = (content: string) => {
  //   setModalContent(content);
  //   setModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setModalOpen(false);
  //   setModalContent("");
  // };
  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const getExistingBillNumber = async () => {
      try {
        const response = await TechFixAPI.get("/sales/invoiceNumber");
        const maxInvoiceNumber = response.data.maxInvoiceNumber;
        const nextInvoiceCounter = maxInvoiceNumber + 1;
        setInvoiceNumber(nextInvoiceCounter);
      } catch (error) {
        console.error("Error fetching invoice number:", error);
      }
    };
    if (cart.length === 0) {
      setDiscountOption(0);
      //setDiscountPercentage(0);
      setDiscountAmount(0);
    }
    getExistingBillNumber();
  }, [cart]);

  const handleCheckout = async (PaymentMethod: string) => {
    try {
      if (cart.length === 0) {
        setErrorMessage("The cart is empty. Cannot proceed with checkout.");
        return;
      }
      const salesRecord = {
        UserId: userProfile.userId,
        BillNumber: invoiceNumber,
        PaymentMethod: PaymentMethod,
        ProductName: "test",
        Subtotal: subTotal.toFixed(2),
        Tax: totalTaxAmount.toFixed(2),
        Total: totalInvoiceAmount.toFixed(2),
        SaleDate: currentDate,
        Discount_percentage: discountAmount,
        DiscountAmount: discountAmount.toFixed(2),
        salesItems: cart.map((cartItem: any) => ({
          SKU: cartItem.sku,
          ProductName: cartItem.productName,
          Quantity: cartItem.quantity,
          UnitPrice: cartItem.cost + cartItem.labor,
          TotalPrice: (cartItem.cost + cartItem.labor) * cartItem.quantity,
        })),
      };
      const salesResponse = await TechFixAPI.post("sales/create", salesRecord);
      if (salesResponse.status === 201) {
        setSuccessMessageForList("Checkout completed!");
        calculateTotal();
        for (const cartItem of cart) {
          try {
            const updateQuantityResponse = await TechFixAPI.put(
              `Products/updateQuantity?productId=${cartItem.id}&quantity=${cartItem.quantity}`
            );
            if (updateQuantityResponse.status !== 200) {
              console.error(
                `Failed to update quantity for item with ID ${cartItem.id}`
              );
            }
          } catch (updateQuantityError) {
            console.error("Error updating quantity:", updateQuantityError);
          }
        }
      } else {
        setErrorMessage("Failed to checkout sales.");
      }
    } catch (error) {
      console.log("Error during checkout:", error);
    } finally {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };
  const calculateTotal = () => {
    let subtotal = cart.reduce(
      (acc: number, item: any) =>
        acc + (item.cost + item.labor) * item.quantity,
      0
    );
    subtotal -= subtotal * discountOption;

    let taxTotal = subtotal * TAX_RATE;
    let totalAmount = subtotal + taxTotal;
    totalAmount = subtotal + taxTotal;
    const calculatedDiscountAmount = subTotal * discountOption;
    setDiscountAmount(calculatedDiscountAmount);
    setTotalInvoiceAmount(totalAmount);
    setTotalTaxAmount(taxTotal);
    setSubTotal(subtotal);
  };
  useEffect(() => {
    let subTotal = 0;
    let totalTaxAmount = 0;
    let totalInvoiceAmount = 0;

    cart.forEach((item) => {
      const itemTotal = (item.cost + item.labor) * item.quantity;
      subTotal += itemTotal;
      totalTaxAmount += itemTotal * 0.07;
    });

    totalInvoiceAmount = subTotal + totalTaxAmount;
    setSubTotal(subTotal);
    setTotalTaxAmount(totalTaxAmount);
    setTotalInvoiceAmount(totalInvoiceAmount);
  }, [cart]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await TechFixAPI.get("Category");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async (categoryId: number) => {
    setLoading(true);
    try {
      const serviceName = await TechFixAPI.get(
        `Products/getServiceNamebyCategoryId/${categoryId}`
      );
      setServiceData(serviceName.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      const result = await TechFixAPI.get(
        `Products/getproductbycategoriesid/${categoryId}`
      );
      setListOfProducts(result.data);
      setProductsItems(result.data);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchProductsByServiceId = async (serviceId: number) => {
    try {
      setLoading(true);
      const result = await TechFixAPI.get(
        `Products/getproductbyserviceandcategoryid/${categoryId}/${serviceId}`
      );
      setListOfProducts(result.data);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };
  const getShop = async () => {
    // try {
    //   const response = await TechFixAPI.get("/path/to/shop");
    //   setShop(response.data);
    // } catch (error) {
    //   console.error("Error fetching shop:", error);
    // }
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    fetchProductsByCategory(categoryId);
    fetchServices(categoryId);
    setCategoryId(categoryId);
  };

  const handleSearch = (searchInput: any) => {
    if (searchInput.trim() !== "") {
      const filteredProductsList = listOfProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setListOfProducts(filteredProductsList);
    } else {
      // Reset filteredProducts to display all products
      setListOfProducts(productsItems);
    }
  };

  return (
    // <div className="flex">
    <div className="flex flex-col md:flex-row">
      {/* <div className="w-2/3 p-4 overflow-x-auto"> */}
      <div
        className={`${
          isCartVisible ? "w-full md:w-2/3" : "w-full"
        } p-4 overflow-x-auto`}
      >
        <div className="flex flex-nowrap gap-4">
          {items.map((item) => (
            <CategoryCard
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              selectedCategoryId={categoryId}
              onCategoryClick={handleCategoryClick}
            />
          ))}
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div
              className="flex items-center space-x-2"
              onClick={() => setShowServices(!showServices)}
            >
              <BsFilterLeft />
              <span>Filter by Service / type</span>
            </div>
            <div>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-1.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Find item"
              />
            </div>
            <div>
              <Dropdown
                value={discountAmount}
                onChange={(selectedValue: string) =>
                  setDiscountAmount(selectedValue)
                }
                options={discountPercentage}
                placeholder="Discount"
                width="20"
              />
            </div>
          </div>
          {showServices && (
            <ul>
              {serviceData?.map((service) => (
                <li
                  key={service.serviceId}
                  onClick={() => fetchProductsByServiceId(service.serviceId)}
                >
                  {service.serviceName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {listOfProducts.map((product) => (
            <ProductItemCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        {listOfProducts.length === 0 && <div>No items found </div>}
      </div>
      <div className="w-1/3 p-4">
        <div
          className="fixed bottom-2 right-4 md:hidden"
          onClick={toggleCartVisibility}
        >
          <button
            onClick={toggleCartVisibility}
            className="bg-slate-600 text-slate-50 rounded-full px-4 py-1 ml-2 flex items-center"
          >
            <CartIcon itemCount={totalItemQuantity} />
          </button>
        </div>

        <div
          className={`fixed inset-0 z-50 transition-transform transform ${
            isCartVisible ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
          ref={cartRef}
        >
          <div className="w-screen md:w-1/3 p-4">
            <Cart
              cart={cart}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleUpdateQuantity={handleUpdateQuantity}
              handleOnDelete={handleOnDelete}
              subTotal={subTotal}
              totalTaxAmount={totalTaxAmount}
              totalInvoiceAmount={totalInvoiceAmount}
              discountPercentage={discountAmount}
              errorMessage={errorMessage}
              successMessageForList={successMessageForList}
              handleCheckout={handleCheckout}
              clearCart={clearCart}
              invoiceNumber={invoiceNumber}
              UserState={userProfile}
              shop={shop}
            />
          </div>
        </div>
      </div>
      {/* 
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={() => handleModalOpen("This is the modal content.")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Open Modal
        </button>

        <Modal
          open={modalOpen}
          handleClose={handleModalClose}
          contentToDisplay={modalContent}
        />
      </div> */}
    </div>
  );
};

export default Pos;
