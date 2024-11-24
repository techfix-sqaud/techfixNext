import axios from "axios";
//const baseURL = process.env.REACT_APP_TECHFIX_API;
const baseURL = "https://www.techfixultra.com/techfixsquad-techfix/techfix/";
//const baseURL = "https://localhost:7032/techfix";
//const baseURL = "http://localhost:5127/techfix";
const TechFixAPI = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const configartion = (token) => {
  TechFixAPI.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const resetConfigartion = () => {
  TechFixAPI.interceptors.request.clear();
  TechFixAPI.interceptors.response.clear();
};

export default TechFixAPI;
