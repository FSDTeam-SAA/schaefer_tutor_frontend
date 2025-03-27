import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { redirect } from "next/navigation";

const PlannedHours = async () => {
  const session = await requireUser();

  if (!session) redirect("/login");

  const data = await prisma.lesson.findMany({
    where: {
      teacherId: session.user.id,
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <span className="bg-blue-500 text-white py-1 px-3 rounded-md w-full text-center">
                        Move
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="bg-red-500 text-white py-1 px-3 rounded-md w-full text-center">
                        Cancel
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="bg-green-500 text-white py-1 px-3 rounded-md w-full text-center">
                        At the moment
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlannedHours;
