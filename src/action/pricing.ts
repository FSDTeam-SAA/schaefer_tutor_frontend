"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PricingFormValues, pricingSchema } from "@/schemas/schema";

export async function createPricing(data: PricingFormValues) {
  const cs = await auth();

  if (!cs?.user) {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const parsedValues = pricingSchema.safeParse(data);

  if (!parsedValues.success) {
    return {
      success: false,
      message: parsedValues.error.message,
    };
  }

  try {
    await prisma.pricing.create({
      data: {
        name: parsedValues.data.name,
        description: parsedValues.data.description,
        price: Number(parsedValues.data.price),
        features: parsedValues.data.features,
        isRecommended: parsedValues.data.isRecommended,
      },
    });

    return {
      success: true,
      message: "Pricing plan created successfully.",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
