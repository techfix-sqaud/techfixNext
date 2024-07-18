export interface SalesRecord {
  id: number;
  userId: number;
  billNumber: number;
  customerName?: string;
  customerId?: number;
  billingAddress?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  status: string;
  discount_percentage?: number;
  discountAmount?: number;
  subtotal: number;
  salesItems: SalesItem[];
  tax: number;
  total: number;
  saleDate: string;
  isExpanded: boolean;
}




export interface SalesItem {
  id: number;
  sku?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  includeTax: boolean;
}



export interface OrderData {
  userId: number | null;
  OrderNumber: number;
  CreatedBy: number; // Assuming CreatedBy is also a user ID
  FirstName: string | null;
  LastName: string | null;
  mobile: string | null;
  email: string | null;
  Order_Status: string;
  subtotal: number;
  total: number;
  Tax: number;
  Description: string;
  Discount_Amount: number;
  Signature: boolean;
  DeviceUserName: string;
  DevicePassword: string;
  DepositAmount: number;
  CreatedAt: string;
  SalesItems: any;
}
