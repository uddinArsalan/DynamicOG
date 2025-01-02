import { SocialLinksType, User } from "@/types";
import { create } from "zustand";
import { userService } from "../services/user.services";

const initialState: Omit<
  User,
  | "login"
  | "logout"
  | "register"
  | "setUserInfo"
  | "setLoggedIn"
  | "updateSocialLink"
> = {
  userInfo: null,
  isLoading: false,
  isLoggedIn: false,
};

export const useAuthStore = create<User>()((set) => ({
  ...initialState,
  setUserInfo: (userInfo) => set({ userInfo }),
  setLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
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
  updateSocialLink: async (socialLink: SocialLinksType) => {
    try {
      await userService.updateSocialLinks(socialLink);
    } catch (error) {
      console.log(error);
    }
  },
}));
