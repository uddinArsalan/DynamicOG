import { API_URL } from "@/constants";
import axios from "axios";
import { UserLoginData, UserRegisterData } from "@/types";

const registerService = ({ name, email, password }: UserRegisterData) => {
  return axios.post(`${API_URL}/api/auth/register`, {
    name,
    email,
    password,
  });
};

const loginService = ({ email, password }: UserLoginData) => {
  console.log(`${API_URL}/api/auth/login`);
  return axios.post(`${API_URL}/api/auth/login`, { email, password });
};

const logoutService = () => {
  return axios.post(`${API_URL}/api/auth/logout`);
};

export const userService = { loginService, registerService, logoutService };
