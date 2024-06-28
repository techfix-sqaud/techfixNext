import axios from "axios";
//const baseURL = process.env.REACT_APP_TECHFIX_API;
const baseURL =
  "https://lionfish-app-rfix7.ondigitalocean.app/techfixsquad-techfix/techfix/";
const TechFixAPI = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default TechFixAPI;
