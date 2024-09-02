"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  use,
} from "react";
import AuthContext from "../../contexts/AuthContext";
import TechFixAPI from "../../helpers/techfixAPI";
import CategoryCard from "./PosItemCard";
import Cart from "./PosCart";
import ProductItemCard from "../productItemCard";
import { BsFilterLeft } from "react-icons/bs";
import { discount, TAX_RATE } from "../../helpers/Enums";
import Dropdown from "../techfixDropdown";
import { FaShoppingCart } from "react-icons/fa";
import CartIcon from "./CratIcon";
import { _getExistingBillNumber } from "@/components/API/adminServices";
import ChangeModal from "./ChangeModel";
import PrintModal from "./PrintModal";
import { toast } from "react-toastify";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import AddCustomItemModal from "./AddCustomItemModal";

const Pos = () => {
  const currentDate = new Date();
  const { userProfile } = useContext(AuthContext)!;
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [productsItems, setProductsItems] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [listOfProducts, setListOfProducts] = useState<any[]>([]);
  const [shop, setShop] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [customItemErrorMessage, setCustomItemErrorMessage] =
    useState<string>("");
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [showServices, setShowServices] = useState<boolean>(false);
  const [invoiceNumber, setInvoiceNumber] = useState(10000);
  const [subTotal, setSubTotal] = useState(0);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [isChangeModalOpen, setChangeModalOpen] = useState(false);
  const [isCustomItemModalOpen, setIsCustomModalOpen] = useState(false);
  const [customProduct, setCustomProduct] = useState<string[]>([""]);
  const [userEnteredCost, setUserEnteredCost] = useState<number>(0);
  const [isPrintModalOpen, setPrintModalOpen] = useState(false);
  const [isPrint, setPrint] = useState(false);
  const [paidAmount, setPaidAmount] = useState<number | null>(null);
  const [changeAmount, setChangeAmount] = useState<number | null>(null);
  const [cartStorage, setCartStorage] = useLocalStorage("cart", "");
  const [displayAlert, setDisplayAlert] = useState<boolean>(true);
  const [successMessageForList, setSuccessMessageForList] =
    useState<string>("");
  const [discountOption, setDiscountOption] = useState<any>(0);
  const [discountAmount, setDiscountAmount] = useState<any>();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const totalItemQuantity = React.useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);
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

    toast.success("Item added to cart!", { autoClose: 3000 });
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

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    setCartStorage(JSON.stringify(cart));
  }, [cart]);

  const getBillNumber = async () => {
    try {
      const data = await _getExistingBillNumber();
      const nextInvoiceNumber = data + 1;
      setInvoiceNumber(nextInvoiceNumber);
    } catch (error) {
      console.error("Error fetching invoice number:", error);
    }
  };

  useEffect(() => {
    if (cart.length === 0) {
      setDiscountOption(0);
      setDiscountAmount(0);
    }
    calculateTotal();
    getBillNumber();
  }, [cart, discountOption]);

  const handleCheckout = async (PaymentMethod: string) => {
    try {
      if (cart.length === 0) {
        toast.error("The cart is empty. Cannot proceed with checkout.", {
          autoClose: 3000,
        });
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
        setPrintModalOpen(true);
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
          } finally {
            toast.success("Checkout completed!", { autoClose: 3000 });
          }
        }
      } else {
        toast.error("Failed to checkout sales.", { autoClose: 3000 });
      }
    } catch (error) {
      console.log("Error during checkout:", error);
    }
  };

  const handleCompleteTransaction = async () => {
    await handleCheckout("cash");
    setChangeModalOpen(false);
  };

  const handleCashCheckout = () => {
    setChangeModalOpen(true);
  };
  const handleCalculateChange = (amountPaid: number, change: number) => {
    setPaidAmount(amountPaid);
    setChangeAmount(change);
  };
  useEffect(() => {
    const storedCart = cartStorage;
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  const calculateTotal = useCallback(() => {
    let subtotal = cart.reduce(
      (acc: number, item: any) =>
        acc + (item.cost + item.labor) * item.quantity,
      0
    );
    subtotal -= subtotal * discountOption;
    let taxTotal = subtotal * TAX_RATE;
    let totalAmount = subtotal + taxTotal;
    totalAmount = subtotal + taxTotal;
    setTotalInvoiceAmount(totalAmount);
    setTotalTaxAmount(taxTotal);
    setSubTotal(subtotal);
  }, [cart, discountOption]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await TechFixAPI.get("Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserEnteredItem = () => {
    if (!customProduct || !userEnteredCost) {
      setCustomItemErrorMessage("Please fill in all fields");
      return;
    }

    const newItem = customProduct.map((productName: any) => ({
      sku: "100070001",
      productName,
      cost: userEnteredCost,
      labor: 0,
      quantity: 1,
      tax: 0,
    }));
    const updatedCart = [...cart, ...newItem];
    setCart(updatedCart);
    setIsCustomModalOpen(false);
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
  const cancelPrint = () => {
    setPrintModalOpen(false);
    setCart([]);
  };
  return (
    <div className="flex flex-col md:flex-row shadow-lg">
      <div className="p-4 w-full md:w-2/3">
        <div className=" mb-4">
          <div className="overflow-x-auto flex flex-nowrap gap-4 pr-10">
            {" "}
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                category={category.category}
                selectedCategoryId={categoryId}
                onCategoryClick={handleCategoryClick}
              />
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowServices(!showServices)}
              >
                <BsFilterLeft style={{ width: "30px", height: "30px" }} />
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
                  onChange={(selectedValue) => {
                    const discountValue = parseInt(selectedValue, 10);
                    setDiscountAmount(selectedValue);
                    setDiscountOption(discountValue / 100); // Update discountOption as a decimal
                  }}
                  options={discountPercentage}
                  placeholder="Discount"
                  width="18"
                />
              </div>
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
        <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-3 lg:w-3/4">
          {listOfProducts.map((product) => (
            <ProductItemCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
          <div
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white h-16 md:h-auto"
            onClick={() => setIsCustomModalOpen(true)}
          >
            <div className="flex-1 mr-3 truncate text-black dark:text-white">
              Add custom item
            </div>
          </div>
        </div>

        {listOfProducts.length === 0 && <div>No items found</div>}
      </div>
      {changeAmount}
      {/* Cart container for web */}
      <div
        className={`${
          !isCartVisible ? "hidden " : "block p-4 w-full w-1/3"
        }md:block p-4 w-full md:w-1/3`}
        ref={cartRef}
      >
        <Cart
          cart={cart}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleUpdateQuantity={handleUpdateQuantity}
          handleOnDelete={handleOnDelete}
          discountPercentage={discountAmount}
          errorMessage={errorMessage}
          successMessageForList={successMessageForList}
          handleCheckout={handleCheckout}
          setPrintModalOpen={setPrintModalOpen}
          handleCashCheckout={handleCashCheckout}
          clearCart={clearCart}
          handlePrintModel={isPrint}
          invoiceNumber={invoiceNumber}
          UserState={userProfile}
          shop={shop}
        />
      </div>

      {/* Cart toggle button for mobile */}
      <div
        className={`${
          isCartVisible ? "hidden" : "fixed bottom-2 right-4 md:hidden"
        }`}
      >
        <button
          onClick={toggleCartVisibility}
          className="bg-slate-600 text-slate-50 rounded-full px-4 py-1 ml-2 flex items-center"
        >
          <CartIcon itemCount={totalItemQuantity} />
        </button>
      </div>
      {isChangeModalOpen && (
        <ChangeModal
          totalAmount={totalInvoiceAmount}
          onClose={() => setChangeModalOpen(false)}
          onCalculateChange={handleCalculateChange}
          onDone={handleCompleteTransaction}
        />
      )}

      {/* Print Receipt Modal */}
      {isPrintModalOpen && (
        <PrintModal
          onPrintReceipt={() => setPrint(true)}
          onClose={() => cancelPrint()}
        />
      )}

      {/* Custom item modal */}
      {isCustomItemModalOpen && (
        <AddCustomItemModal
          onClose={() => setIsCustomModalOpen(false)}
          error={customItemErrorMessage}
          setCustomProduct={setCustomProduct}
          setUserEnteredCost={setUserEnteredCost}
          addTocart={handleAddUserEnteredItem}
        />
      )}
    </div>
  );
};

export default Pos;
