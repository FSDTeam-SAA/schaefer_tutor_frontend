"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  StudentProfileSchemaType,
  TeacherCreateSchemaType,
  TeacherProfileSchemaType,
} from "@/schemas/schema";

export const updateProfile = async (data: StudentProfileSchemaType) => {
  const currentUser = await auth();

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized user",
    };
  }

  const userId = currentUser.user.id;

  try {
    // Filter out undefined values to avoid overwriting with null
    const updateData: Partial<StudentProfileSchemaType> = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Update failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
export const updateTeacherProfile = async (data: TeacherProfileSchemaType) => {
  const currentUser = await auth();

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized user",
    };
  }

  const userId = currentUser.user.id;

  try {
    // Filter out undefined values to avoid overwriting with null
    const updateData: Partial<TeacherCreateSchemaType> = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Update failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
