import z from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid Email Address"),
  password: z
    .string()
    .trim()
    .min(8, "At least 8 characters required")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/\d/, "Include at least one number")
    .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(4, "Must have at least 1 character"),
  email: z.string().trim().email("Invalid Email Address"),
  password: z
    .string()
    .trim()
    .min(8, "At least 8 characters required")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/\d/, "Include at least one number")
    .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
});