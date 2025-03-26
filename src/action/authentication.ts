"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema, LoginValues, registrationSchema } from "@/schemas/schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function RegistrationAction(
  data: z.infer<typeof registrationSchema>
) {
  const validationResult = registrationSchema.safeParse(data);

  if (!validationResult.success) {
    // Return errors if validation fails
    return { errors: validationResult.error.format() };
  }

  // If validation passes, proceed with registration logic
  const validatedData = validationResult.data;

  // Check if the user already exists
  const exist = await prisma.user.findFirst({
    where: {
      email: validatedData.email,
    },
  });

  if (exist) {
    return {
      success: false,
      message: "User already exists.",
    };
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  // Create the user in the database
  await prisma.user.create({
    data: {
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name, // Assuming name is part of registrationSchema
    },
  });

  return { success: true, redirect: "/" }; // 👈 Explicit response
}

export async function LoginAction(data: LoginValues) {
  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, message: validationResult.error.message };
  }

  const validatedData = validationResult.data;

  // Check if the user exists
  const user = await prisma.user.findFirst({
    where: {
      email: validatedData.email as string,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User Not Found!",
    };
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(
    validatedData.password as string,
    user.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Password mismatch!",
    };
  }

  try {
    await signIn("credentials", {
      redirectTo: "/",
      email: validatedData.email,
      password: validatedData.password,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid credentials!",
          };

        default:
          return {
            success: false,
            message: "Something went wrong!",
          };
      }
    }

    throw error;
  }

  // You can implement session handling or JWT generation here

  return redirect("/");
}
