"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import { LessonCreateSchema, lessonCreateSchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache"; // adjust if you're using a different revalidation strategy

export async function createLessonAction(input: LessonCreateSchema) {
  // Step 1: Validate input with Zod schema
  const parsedInput = lessonCreateSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      message: parsedInput.error.message,
    };
  }

  const { studentId, date, time } = parsedInput.data;

  const session = await requireUser(); // Ensure that a user is logged in

  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized: User session is required",
    };
  }

  try {
    // Step 2: Check if the teacher and student exist
    const teacherExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    const studentExists = await prisma.user.findUnique({
      where: { id: studentId },
    });

    if (!teacherExists) {
      return {
        success: false,
        message: "Teacher not found",
      };
    }

    if (!studentExists) {
      return {
        success: false,
        message: "Student not found",
      };
    }

    // Step 3: Create the lesson
    const newLesson = await prisma.lesson.create({
      data: {
        teacherId: session.user.id as string,
        studentId,
        date,
        time,
        status: "planned", // Default status for a new lesson
        subjectId: parsedInput.data.subjectId,
      },
    });

    // Optionally, revalidate the relevant path to reflect the changes
    revalidatePath("/dashboard/teacher"); // Adjust the path as needed

    return {
      success: true,
      message: "Lesson created successfully",
      lesson: newLesson,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Step 4: Handle errors
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}

export async function editLessonAction(
  input: LessonCreateSchema,
  lessonId: string
) {
  // Step 1: Validate input with Zod schema
  const parsedInput = lessonCreateSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      message: parsedInput.error.message,
    };
  }

  const { studentId, date, time, subjectId } = parsedInput.data;

  const session = await requireUser(); // Ensure that a user is logged in

  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized: User session is required",
    };
  }

  try {
    // Step 2: Check if the lesson exists and belongs to the logged-in teacher
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!existingLesson) {
      return {
        success: false,
        message: "Lesson not found",
      };
    }

    if (existingLesson.teacherId !== session.user.id) {
      return {
        success: false,
        message: "Unauthorized: You do not have permission to edit this lesson",
      };
    }

    // Step 3: Check if the student exists
    const studentExists = await prisma.user.findUnique({
      where: { id: studentId },
    });

    if (!studentExists) {
      return {
        success: false,
        message: "Student not found",
      };
    }

    // Step 4: Update the lesson
    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        studentId,
        date,
        time,
        subjectId,
      },
    });

    // Optionally, revalidate the relevant path to reflect the changes
    revalidatePath("/dashboard/teacher"); // Adjust the path as needed

    return {
      success: true,
      message: "Lesson updated successfully",
      lesson: updatedLesson,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Step 5: Handle errors
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}
