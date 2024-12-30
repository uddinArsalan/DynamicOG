import axios from "@/axios/axiosInstance";

export const getTemplates = () => {
  return axios.get("/template");
};

export const templateServices = { getTemplates };
