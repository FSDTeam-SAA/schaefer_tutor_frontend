import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import moment from "moment";
import { redirect } from "next/navigation";

export default async function PastHours() {
  const session = await requireUser();
  if (!session) redirect("/login");
  const data = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      status: "accepted",
    },
    include: {
      subject: {
        select: {
          name: true,
        },
      },
      teacher: {
        select: {
          name: true,
        },
      },
    },
  });

  function parseTimeString(timeString: string) {
    const [time, modifier] = timeString.split(" ");

    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    minutes = minutes + 0;

    // Create a Date object for today with the parsed time
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  }

  // Get the current date and time
  const now = new Date();

  // Filter lessons for today and exclude past lessons
  const todaysLessons = data.filter((lesson) => {
    const lessonTime = parseTimeString(lesson.time); // Parse the lesson time

    // Check if the lesson is today and its time is greater than or equal to the current time
    return (
      lessonTime.getDate() === now.getDate() && // Check if the lesson is today
      lessonTime.getMonth() === now.getMonth() && // Ensure the month matches
      lessonTime.getFullYear() === now.getFullYear() && // Ensure the year matches
      lessonTime >= now // Ensure the lesson time is not in the past
    );
  });
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Today hours</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>Academic subject</TableHead>
            <TableHead>Teacher</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todaysLessons.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">
                {moment(session.date).format("MMMM D, YYYY")}
              </TableCell>
              <TableCell>{session.time}</TableCell>
              <TableCell>{session.subject.name}</TableCell>
              <TableCell>{session.teacher.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
