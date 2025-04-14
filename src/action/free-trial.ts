"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FreeTrialSchemaType } from "@/schemas/schema";
import { revalidatePath } from "next/cache";

export async function createAFreeTrialRequest(data: FreeTrialSchemaType) {
  try {
    const isAlreadyTaken = await prisma.freeTrialReq.findFirst({
      where: {
        studentEmail: data.email,
      },
    });

    if (isAlreadyTaken) {
      return {
        success: false,
        message: "You have already submitted a free trial request.",
      };
    }

    const createdRequest = await prisma.freeTrialReq.create({
      data: {
        fullName: data.fullName,
        studentEmail: data.email,
        phone: data.phone,
        subject: data.subject,
        notes: data.notes || "",
        preferredSlots: {
          create: data.preferredSlots.map((slot) => ({
            date: new Date(slot.date),
            time: slot.time,
          })),
        },
      },
    });

    return {
      success: true,
      message: "Free trial request submitted successfully!",
      data: createdRequest,
    };
  } catch (error) {
    console.error("Free Trial Request Error:", error);
    return {
      success: false,
      message:
        "Something went wrong while submitting your request. Please try again later.",
    };
  }
}

export const OnAcceptFreeTrialReq = async ({
  date,
  time,
  reqId,
}: {
  date: Date;
  time: string;
  reqId: string;
}) => {
  const currentUser = await auth();

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  if (currentUser.user.role !== "teacher") {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const teacherId = currentUser.user.id;

  try {
    const updatedRequest = await prisma.freeTrialReq.update({
      where: {
        id: reqId,
      },
      data: {
        teacherId,
        date,
        time,
        status: "accepted", // assuming there's a status field
      },
    });

    // send email to the student

    revalidatePath("/dashboard/teacher/free-trial-requests");

    return {
      success: true,
      message: "Free trial request accepted",
      data: updatedRequest,
    };
  } catch (error) {
    console.error("Error accepting free trial request:", error);
    return {
      success: false,
      message: "An error occurred while processing the request.",
    };
  }
};
