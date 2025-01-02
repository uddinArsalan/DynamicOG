import axios from "@/axios/axiosInstance";
import { SocialLinksType, UserLoginData, UserRegisterData } from "@/types";

const registerService = ({ name, email, password }: UserRegisterData) => {
  return axios.post(`/auth/register`, {
    name,
    email,
    password,
  });
};

const loginService = ({ email, password }: UserLoginData) => {
  return axios.post(`/auth/login`, { email, password });
};

const logoutService = () => {
  return axios.post(`/auth/logout`);
};

const updateSocialLinks = (socialLinkPayload : SocialLinksType) => {
  return axios.post(`/user/addLink`,{socialLinkPayload});
};

export const userService = {
  loginService,
  registerService,
  logoutService,
  updateSocialLinks,
};
