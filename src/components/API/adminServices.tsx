import { SalesRecord } from "../contexts/types/SalesRecord";
import TechFixAPI from "../helpers/techfixAPI";

export const _getCustomerCount = async () => {
  try {
    const response = await TechFixAPI.get("Users/customer-count");

    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _getInvoiceCount = async () => {
  try {
    const response = await TechFixAPI.get("sales/invoiceCount");
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const _getSalesByDate = async (
  startDate: string | Date | undefined,
  endDate: string | Date | undefined
) => {
  try {
    const Sales = await TechFixAPI.get("sales/incomeByDateRange", {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return Sales.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _salesTotal = async (startDate: Date, endDate: Date) => {
  try {
    const Sales = await TechFixAPI.get("sales/incomeByDateRange", {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return Sales;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _getSalesByBillNumber = async (billNumber: number) => {
  try {
    const InvoiceDetails = await TechFixAPI.get(
      `sales/generateFormalInvoice/${billNumber}`
    );
    return InvoiceDetails;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _getExistingBillNumber = async () => {
  try {
    const response = await TechFixAPI.get("/sales/invoiceNumber");
    return response.data.maxInvoiceNumber;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

const createSales = async (salesRecord: any) => {
  try {
    const salesResponse = await TechFixAPI.post("sales/create", salesRecord);
    return salesResponse.data; // Assuming you want to return data from the response
  } catch (error) {
    console.error("Error creating sales record:", error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};
