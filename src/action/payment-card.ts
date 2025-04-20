"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export async function savePaymentMethod(pmid: string) {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "You must be logged in to save a payment method.",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: cu.user.id,
      },
      data: {
        stripePaymentMethodId: pmid,
      },
    });

    revalidatePath("/dashboard/student/payment");

    return {
      success: true,
      message: "Your card has been saved successfully.",
    };
  } catch (error) {
    console.error("Failed to save payment method:", error);
    return {
      success: false,
      message:
        "Something went wrong while saving your payment method. Please try again.",
    };
  }
}

export async function removePaymentMethod() {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "You must be logged in to remove a payment method.",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      id: cu.user.id,
    },
    select: {
      stripeCustomerId: true,
      stripePaymentMethodId: true,
    },
  });

  if (!user?.stripePaymentMethodId) {
    return {
      success: false,
      message: "No payment method found to remove.",
    };
  }

  if (!user.stripeCustomerId) {
    return {
      success: false,
      message: "No Stripe customer associated with this account.",
    };
  }

  try {
    await stripe.paymentMethods.detach(user.stripePaymentMethodId);

    await stripe.customers.del(user.stripeCustomerId);

    await prisma.user.update({
      where: { id: cu.user.id },
      data: {
        stripeCustomerId: null,
        stripePaymentMethodId: null,
      },
    });

    revalidatePath("/dashboard/student/payment");

    return {
      success: true,
      message: "Stripe customer and related data removed successfully.",
    };
  } catch (error) {
    console.error("Error removing Stripe customer:", error);
    return {
      success: false,
      message: "Something went wrong while removing the customer from Stripe.",
    };
  }
}
