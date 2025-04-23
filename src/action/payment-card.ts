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

export async function saveSepaPayment() {
  try {
    // Step 1: Authenticate the user
    const cu = await auth();

    if (!cu?.user?.id) {
      return {
        success: false,
        message: "User authentication failed",
      };
    }

    // Step 2: Fetch the user from the database
    const user = await prisma.user.findFirst({
      where: { id: cu.user.id },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Step 3: Ensure the user has a Stripe customer ID
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      // Create a new Stripe customer if one doesn't exist
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: { userId: cu.user.id },
      });

      customerId = customer.id;

      // Update the user record with the Stripe customer ID
      await prisma.user.update({
        where: { id: cu.user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Step 4: Create a Stripe Checkout session for payment method setup
    console.log({ user: user.id });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "sepa_debit"],
      mode: "setup",
      customer: customerId,
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
      metadata: {
        userId: user.id,
      },
    });

    console.log({ metadata: session.metadata });

    // Step 5: Return the session URL to the client
    return {
      success: true,
      message: "Checkout session created successfully",
      sessionUrl: session.url,
    };
  } catch (error) {
    console.error("Error saving SEPA payment:", error);

    // Return a generic error message to the client
    return {
      success: false,
      message: "An error occurred while processing your request",
    };
  }
}
