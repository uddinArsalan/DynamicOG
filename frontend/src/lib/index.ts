import {
  LoginErrorType,
  LoginFields,
  RegisterErrorType,
  RegisterFields,
} from "@/types";

export const parseLoginFieldErrors = (
  error: LoginErrorType,
  field: LoginFields
) => {
  return error?.format()?.[field]?._errors || [];
};

export const parseRegisterFieldErrors = (
  error: RegisterErrorType,
  field: RegisterFields
) => {
  return error?.format()?.[field]?._errors || [];
};

