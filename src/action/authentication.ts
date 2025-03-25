"use server";
import { registrationSchema } from "@/app/(auth)/sign-up/_components/registration-form";
import { z } from "zod";

export const RegistrationAction = (
  data: z.infer<typeof registrationSchema>
) => {};
