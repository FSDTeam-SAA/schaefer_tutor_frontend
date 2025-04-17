// app/api/submit/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

function generateSlug(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function POST(request: Request) {
  const cs = await auth();

  if (!cs?.user) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized access",
      },
      {
        status: 500,
      }
    );
  }

  const slug = generateSlug();

  // Here you’d save to a DB or do other processing

  return NextResponse.json({
    message: "Data received",
    slug: slug,
    received: "",
  });
}
