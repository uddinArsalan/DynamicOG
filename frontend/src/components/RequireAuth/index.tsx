import axiosInstance from "@/axios/axiosInstance";
import { useAuthStore } from "@/store/AuthStore";
import { AxiosError } from "axios";
import useSWR, { SWRConfig } from "swr";
// import { useNavigate } from "react-router-dom";
import React from "react";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  // const navigate = useNavigate();
  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);
  const { setUserInfo } = useAuthStore();
  const { data } = useSWR("/api/user", fetcher);
  setUserInfo(data);
  return (
    <SWRConfig
      value={(parentConfig) => ({
        ...parentConfig,
        onError: (err: AxiosError) => {
          if (err.response?.status === 401) {
            // navigate("/login");
          }
        },
      })}
    >
      {children}
    </SWRConfig>
  );
};

export default RequireAuth;
