// https://chatgpt.com/share/681b168e-0070-8012-8386-731eec90e1fe
import { prisma } from "@/lib/prisma";

interface Props {
  teacherId: string;
  studentId: string;
}

export async function sendConnectionRequest({ teacherId, studentId }: Props) {
  const existing = await prisma.connection.findFirst({
    where: {
      teacherId,
      studentId,
    },
  });

  if (existing) {
    return {
      success: false,
      message: "Connection request already exists",
    };
  }

  await prisma.connection.create({
    data: {
      teacherId,
      studentId,
      status: "pending",
    },
  });

  return {
    success: true,
    message: "Connection request sent successfully",
  };
}
