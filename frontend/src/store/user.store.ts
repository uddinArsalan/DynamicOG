import { User } from "@/types";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { userService } from "../services/user.service";

const initialState: Omit<User, "login" | "logout" | "register"> = {
  name: "",
  email: "",
  error: false,
  isLoading: false,
  success: true,
};

const middlewares = (cb: StateCreator<User>) =>
  devtools(persist(cb, { name: "user-persist" }));

export const useAuthStore = create<User>()(
  middlewares((set) => ({
    ...initialState,
    login: async ({ email, password }) => {
      console.log({ email, password });
      set({ isLoading: true });
      try {
        const res = await userService.loginService({ email, password });
        const { name } = res.data.user;
        console.log(res.data);
        set({ isLoading: false, error: false, name, email });
      } catch (err) {
        set({ isLoading: false, error: true, name: "", email: "" });
        throw err;
      }
    },
    register: async ({ name, email, password }) => {
      set({ isLoading: true });
      try {
        await userService.registerService({ name, email, password });
        set({ isLoading: false, error: false, name, email });
      } catch (err) {
        set({ isLoading: false, error: true, name: "", email: "" });
        throw err;
      }
    },
    logout: async () => {
      await userService.logoutService();
      set({ ...initialState });
    },
  }))
);
