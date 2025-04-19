"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { paymentCardSchema, PaymentCardSchemaType } from "@/schemas/schema";

export async function createCardAction(data: PaymentCardSchemaType) {
  const session = await auth();

  // Check if the user is authenticated
  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to add a payment card.",
    };
  }

  // Validate the input data using the schema
  const parsedValue = paymentCardSchema.safeParse(data);

  if (!parsedValue.success) {
    return {
      success: false,
      message:
        "Invalid card details. Please check the information and try again.",
    };
  }

  // Check if the card already exists in the database
  const isExists = await prisma.cardInfos.findFirst({
    where: {
      cardNumber: parsedValue.data.cardNumber,
    },
  });

  if (isExists) {
    return {
      success: false,
      message: "This card has already been added to your account.",
    };
  }

  try {
    // Create the card entry in the database
    await prisma.cardInfos.create({
      data: {
        cardholderName: parsedValue.data.cardholderName,
        cardNumber: parsedValue.data.cardNumber,
        expiryMonth: parsedValue.data.expiryMonth,
        expiryYear: parsedValue.data.expiryYear,
        cvc: parsedValue.data.cvc,
        userId: session.user.id,
      },
    });

    return {
      success: true,
      message: "Your payment card has been successfully added.",
    };
  } catch (error) {
    console.error("Error while adding the card:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while adding the card. Please try again later.",
    };
  }
}
