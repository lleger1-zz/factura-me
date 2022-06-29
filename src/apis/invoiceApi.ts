import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariable();

const invoiceApi = axios.create({
  baseURL: VITE_API_URL,
});

//Todo: configurar interceptrores
invoiceApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  // console.log(token);
  config.headers = {
    ...config.headers,
    "x-token": token,
  };
  return config;
});

export default invoiceApi;
