import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as $Enums.LessonStatus & "all";

    // Fetch hours with related teacher and pupil data
    const hours = await prisma.lesson.findMany({
      where: {
        status: status === "all" ? undefined : status,
      },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
        student: {
          select: {
            name: true,
          },
        },
        subject: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    // all,

    return NextResponse.json(hours ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching hours:", error);
    return NextResponse.json(
      { error: "Failed to fetch hours" },
      { status: 500 }
    );
  }
}
