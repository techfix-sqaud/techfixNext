import { Quote } from "../contexts/types/Messages";
import TechFixAPI from "../helpers/techfixAPI";

export const _getMessages = async () => {
  try {
    const messages = await TechFixAPI.get("/Messages");
    return messages.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _getQuotes = async () => {
  try {
    const result = await TechFixAPI.get("Quotes");
    console.log("result", result);
    return result.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _updateMessageStatus = async (
  id: number,
  updatedMessage: string
) => {
  try {
    const response = await TechFixAPI.put(
      `Messages/updateMessage/${id}`,
      updatedMessage
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _updateQuoteStatus = async (id: number) => {
  try {
    const response = await TechFixAPI.put(`Quotes/updateQuote/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _getAds = async () => {
  try {
    const response = await TechFixAPI.get("Ad");
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const _createAd = async (ad: string) => {
  const createAd = await TechFixAPI.post("Ad/create", { ad });
  return createAd.data;
};

export const _updateAd = async (id: number, ad: string) => {
  const updateAd = await TechFixAPI.put(`Ad/update/${id}`, { ad });
  return updateAd.data;
};
