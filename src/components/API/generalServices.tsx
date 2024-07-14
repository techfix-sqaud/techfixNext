import { UserData } from "../contexts/types/UserData";
import TechFixAPI from "../helpers/techfixAPI";

export const _subscriber = async (email: any) => {
  try {
    const Subscribe = await TechFixAPI.post("Subscriber/joinNow", {
      email: email,
    });
    return Subscribe;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};
export const sendConfirmationEmail = async (
  email: string | any,
  subject: string,
  message: string
) => {
  try {
    await TechFixAPI.post("Smtp/Confirmation", {
      receiversEmail: email,
      emailBody: message,
      emailSubject: subject,
    });
    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export const _getUserById = async (id: number | null) => {
  try {
    const user = await TechFixAPI.get(`Users/${id}`);
    return user.data;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export const _getUsers = async () => {
  try {
    const users = await TechFixAPI.get("Users");
    return users;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export const _createUser = async (
  userData: UserData,
  phoneNumber: string,
  signature: boolean
) => {
  try {
    const users = await TechFixAPI.post("Users/create", {
      firstName: userData.firstName,
      last_name: userData.last_name,
      role: userData.role,
      mobile: phoneNumber,
      email: userData.email,
      signature,
    });
    return users;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export const _getOrderById = async (id: number) => {
  try {
    const getOrderById = await TechFixAPI.get(`Order/${id}`);
    return getOrderById;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const _createOrder = async (data: any) => {
  try {
    const createOrder = await TechFixAPI.post("Order/create", data);
    return createOrder;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};
