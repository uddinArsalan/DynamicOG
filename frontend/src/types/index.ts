import { ZodError } from "zod";

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
}

export type UserBasicDetails = Omit<UserRegisterData, "password">;

export interface User {
  userInfo: UserBasicDetails & {socialLinks? : SocialLinksType[]} | null ;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUserInfo: (userInfo: UserBasicDetails | null) => void;
  setLoggedIn: (status: boolean) => void;
  login: ({ email, password }: UserLoginData) => Promise<void>;
  register: ({ name, email, password }: UserRegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateSocialLink : (socialLinkPayload : SocialLinksType) => Promise<void>
}

export type LoginErrorType =
  | ZodError<{
      email: string;
      password: string;
    }>
  | undefined;

export type RegisterErrorType =
  | ZodError<{
      name: string;
      email: string;
      password: string;
    }>
  | undefined;

export type LoginFields = "email" | "password";
export type RegisterFields = "name" | "email" | "password";

type Categories = "social" | "marketing" | "blog" | "personal";

export interface Template {
  _id: string;
  name: string;
  category: Categories[];
  isDefault: boolean;
  jsx: string;
}

export type PLATFORM = 'twitter'| 'linkedin'|'reddit'|'threads'

export interface SocialLinksType{
  platform : PLATFORM;
  url : string;
}

export interface BasicOGPostDetails {
  _id : string;
  title : string;
  content : string;
  ogImageUrl : string;
  createdAt : string;
}