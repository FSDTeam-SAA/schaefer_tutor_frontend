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
import PlannedHoursAction from "./planned-hours-action";

const PlannedHours = async () => {
  const session = await requireUser();

  if (!session) redirect("/login");

  const student = await prisma.user.findMany({
    where: {
      role: "student",
    },
  });

  const data = await prisma.lesson.findMany({
    where: {
      teacherId: session.user.id,
      status: "planned",
    },
    include: {
      subject: {
        select: {
          name: true,
        },
      },
      student: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Planned hours</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pupils</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>Academic subject</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell className="font-medium">
                {lesson.student.name}
              </TableCell>
              <TableCell>
                {moment(lesson.date).format("MMMM D, YYYY")}
              </TableCell>
              <TableCell>{lesson.time}</TableCell>
              <TableCell>{lesson.subject.name}</TableCell>
              <TableCell>
                <PlannedHoursAction data={lesson} students={student} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlannedHours;
