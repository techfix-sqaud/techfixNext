export interface SalesRecord {
  id: number;
  billNumber: number;
  salesItems: Array<{
    id: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  isExpanded: boolean;
  tax: number;
  status: string;
  subtotal: number;
  total: number;
  saleDate: string;
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
