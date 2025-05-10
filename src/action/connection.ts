"use server";
// https://chatgpt.com/share/681b168e-0070-8012-8386-731eec90e1fe
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Props {
  studentId: string;
}

export async function connectStudent({ studentId }: Props) {
  const cu = await auth();

  if (!cu?.user) redirect("/login");
  if (cu.user.role !== "teacher") {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const teacherId = cu.user.id as string;
  const existing = await prisma.connection.findFirst({
    where: {
      teacherId,
      studentId,
    },
  });

  if (existing) {
    return {
      success: false,
      message: "Assign request already exists",
    };
  }

  await prisma.connection.create({
    data: {
      teacherId,
      studentId,
      status: "pending",
    },
  });

  revalidatePath("/dashboard/teacher/profile/student-request");

  return {
    success: true,
    message: "Assign request sent successfully",
  };
}
