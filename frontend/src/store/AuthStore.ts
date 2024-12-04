import { User } from "@/types";
import { create } from "zustand";
import { userService } from "../services/user.service";

const initialState: Omit<
  User,
  "login" | "logout" | "register" | "setUserInfo"
> = {
  userInfo: null,
  isLoading: false,
  isLoggedIn: false,
};

export const useAuthStore = create<User>()((set) => ({
  ...initialState,
  setUserInfo: (userInfo) => set({ userInfo, isLoggedIn: true }),
  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const res = await userService.loginService({ email, password });
      const { name } = res.data.data.user;
      const userInfo = { name, email };
      set({ isLoading: false, isLoggedIn: true, userInfo });
    } catch (err) {
      set({
        isLoading: false,
        userInfo: null,
        isLoggedIn: false,
      });
      throw err;
    }
  },
  register: async ({ name, email, password }) => {
    set({ isLoading: true });
    try {
      await userService.registerService({ name, email, password });
      await userService.loginService({ email, password });
      const userInfo = { name, email };
      set({ isLoading: false, userInfo, isLoggedIn: true });
    } catch (err) {
      set({
        isLoading: false,
        userInfo: null,
        isLoggedIn: false,
      });
      throw err;
    }
  },
  logout: async () => {
    await userService.logoutService();
    set({ ...initialState });
  },
}));
