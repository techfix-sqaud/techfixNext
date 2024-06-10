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
