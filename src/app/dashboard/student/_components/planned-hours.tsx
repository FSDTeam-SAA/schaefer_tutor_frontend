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

export default async function PlannedHours() {
  const session = await requireUser();
  if (!session) redirect("/login");

  const data = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      status: "accepted",
      date: {
        gte: new Date(),
      },
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
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Planned hours</h2>
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
          {data.map((session) => (
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
