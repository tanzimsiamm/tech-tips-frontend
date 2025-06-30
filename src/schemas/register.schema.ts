import { z } from "zod";

const nameSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
});

export const registerValidationSchema = z.object({
  name: nameSchema,
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  image: z.string().url("Invalid image URL.").optional().or(z.literal("")),
});

export type RegisterFormInputs = z.infer<typeof registerValidationSchema>;
