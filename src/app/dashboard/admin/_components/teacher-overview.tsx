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
import { AddTeacherDialog } from "./add-teacher-dialog";
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string;
  students: number;
}

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Simon Schäfer",
    email: "simon@schaefertutoring.de",
    subjects: "Mathematics, Physics",
    students: 8,
  },
  {
    id: "2",
    name: "Anna Fischer",
    email: "anna@schaefertutoring.de",
    subjects: "German English",
    students: 6,
  },
  {
    id: "3",
    name: "Michael Weber",
    email: "michael@schaefertutoring.de",
    subjects: "Chemistry, Biology",
    students: 5,
  },
];

export default async function TeacherOverview() {
  const subjects = await prisma.subject.findMany();
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
              <TableHead>fan</TableHead>
              <TableHead>Number of students</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher: Teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.subjects}</TableCell>
                <TableCell>{teacher.students}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {/* <EditTeacherDialog teacher={teacher} />
                    <DeleteTeacherDialog teacherName={teacher.name} /> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
