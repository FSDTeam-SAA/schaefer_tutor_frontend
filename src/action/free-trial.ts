"use server";

import { prisma } from "@/lib/prisma";
import { FreeTrialSchemaType } from "@/schemas/schema";

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
