"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import { redirect } from "next/navigation";

export const createReview = async (rating: number, message: string) => {
  const session = await requireUser();

  if (!session?.user) redirect("/login");

  try {
    await prisma.review.create({
      data: {
        userId: session.user.id as string,
        rating,
        message,
      },
    });

    return {
      success: true,
      message: "Thanks for your review!",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
