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
