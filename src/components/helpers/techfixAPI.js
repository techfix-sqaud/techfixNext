"use client";
import axios from "axios";
//const baseURL = process.env.REACT_APP_TECHFIX_API;

const baseURL = "https://localhost:7032/techfix";
const TechFixAPI = axios.create({
  baseURL: baseURL,
  // headers: {
  //   Authorization: `Bearer ${token}`, // Corrected string interpolation
  // },
  withCredentials: true,
});

export default TechFixAPI;
