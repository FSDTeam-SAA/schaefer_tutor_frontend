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
import { TableActions } from "./table-action";

export default async function OpenConfirmationRequests() {
  const session = await requireUser();
  if (!session) redirect("/login");

  const data = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      status: "planned",
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
      <h2 className="text-xl font-semibold">Open confirmation requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>Academic subject</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">
                <p>{moment(request.date).format("MMMM D, YYYY")}</p>
              </TableCell>
              <TableCell>{request.time}</TableCell>
              <TableCell>{request.subject.name}</TableCell>
              <TableCell>{request.teacher.name}</TableCell>
              <TableCell>
                <TableActions id={request.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
