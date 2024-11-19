import { ZodError } from "zod";

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
}
export interface User {
  name: string;
  email: string;
  error: boolean;
  isLoading: boolean;
  success: boolean;
  login: ({ email, password }: UserLoginData) => Promise<void>;
  register: ({ name, email, password }: UserRegisterData) => Promise<void>;
  logout: () => Promise<void>;
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
