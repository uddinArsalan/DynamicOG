import { LoginErrorType, LoginFields } from "@/types";

export const parseFieldErrors = (error: LoginErrorType, field: LoginFields) => {
  return error?.format()?.[field]?._errors || [];
};
