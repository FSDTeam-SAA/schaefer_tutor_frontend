"use server";

import { prisma } from "@/lib/prisma";
import { SubjectSchemaType } from "@/schemas/schema";
import { z } from "zod";

const subjectSchema = z.object({
  name: z.string().min(2, "Subject name must be at least 2 characters"),
});

export async function CreateSubjectAction(values: SubjectSchemaType) {
  const submissionValue = subjectSchema.safeParse(values);

  if (!submissionValue.success) {
    return {
      success: false,
      message: submissionValue.error.message,
    };
  }

  try {
    await prisma.subject.create({
      data: {
        name: submissionValue.data.name,
      },
    });

    return {
      success: true,
      message: "Subject Added Successfully",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
