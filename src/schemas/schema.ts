import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
  phone: z.string(),
  name: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
});

export type LoginValues = z.infer<typeof loginSchema>;
