import axios from "axios";
//const baseURL = process.env.REACT_APP_TECHFIX_API;
const baseURL = "https://www.techfix-raleigh.com/techfixsquad-techfix/techfix/";
//const baseURL = "https://localhost:7032/techfix";
const TechFixAPI = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default TechFixAPI;
