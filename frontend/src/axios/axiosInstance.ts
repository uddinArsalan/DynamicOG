import axios from "axios";
import { API_URL } from "@/constants";

export default axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

