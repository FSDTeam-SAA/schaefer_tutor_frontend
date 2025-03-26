"use server";
import { prisma } from "@/lib/prisma";
import { loginSchema, LoginValues, registrationSchema } from "@/schemas/schema";
import bcrypt from "bcryptjs";
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

  console.log("server clicked");
  if (!validationResult.success) {
    return { errors: validationResult.error.format() };
  }

  const validatedData = validationResult.data;

  // Check if the user exists
  const user = await prisma.user.findFirst({
    where: {
      email: validatedData.email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "No account found with this email.",
    };
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(
    validatedData.password,
    user.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Incorrect password. Please try again.",
    };
  }

  // You can implement session handling or JWT generation here

  return redirect("/");
}
