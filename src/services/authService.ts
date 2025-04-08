import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_new_Base_URL;

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data; 
};

const register = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

const forgetPassword = async (email: string) => {
  const response = await axios.post(`${BASE_URL}/forgot-password`, email);
  return response.data;
};
const updatePassword = async (userData: { verify_code: string; password: string; password_confirmation: string }) => {
  const response = await axios.post(`${BASE_URL}/update-password`, userData);
  return response.data;
};

const logout = () => {
  Cookies.remove("userToken");
};

export default {login, register, logout, forgetPassword, updatePassword} 
