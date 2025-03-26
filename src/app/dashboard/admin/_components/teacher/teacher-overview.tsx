import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { AddTeacherDialog } from "./add-teacher-dialog";
import TeacherAction from "./teacher-action";
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string;
  students: number;
}

export default async function TeacherOverview() {
  const subjects = await prisma.subject.findMany();
  const teachers = await prisma.user.findMany({
    where: {
      role: "teacher",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Teacher Overview</h2>
        <AddTeacherDialog
          subjects={subjects ?? []}
          trigger={<Button effect="gooeyRight">Add new teacher</Button>}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>name</TableHead>
              <TableHead>e-mail</TableHead>
              <TableHead>Fan</TableHead>
              <TableHead>Number of students</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher: User) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    {teacher.subjects.map((s) => (
                      <Badge
                        className="text-[10px] rounded-[50px] px-2"
                        key={s}
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <TeacherAction subjects={subjects} data={teacher} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
