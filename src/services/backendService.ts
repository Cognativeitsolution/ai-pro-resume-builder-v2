import axios from "axios";
import Cookies from "js-cookie";

// Create an axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_new_Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = Cookies.get("userToken");  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in cookies!");
  }
  return config;
});


// Generic request function
const request = async (
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  data?: any,
  params?: any
) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      params,
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// General API functions
const API = {
  get: (endpoint: string, params?: any) => request("get", endpoint, null, params),
  post: (endpoint: string, data: any) => request("post", endpoint, data),
  put: (endpoint: string, data: any) => request("put", endpoint, data),
  delete: (endpoint: string) => request("delete", endpoint),
};

export { API };
