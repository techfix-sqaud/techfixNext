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
    return true; // Return true if email is sent successfully
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error; // Optionally re-throw the error to handle it in the caller
  }
};
