import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import BookLessonModal from "./_components/add-lesson-modal";
import PlannedHours from "./_components/planned-hours";

// Sample data for past lessons
const pastLessons = [
  {
    id: 4,
    pupil: "Max Müller",
    date: "March 20, 2025",
    startTime: "16:00",
    subject: "mathematics",
  },
  {
    id: 5,
    pupil: "Lena Schmidt",
    date: "March 18, 2025",
    startTime: "2:30 p.m.",
    subject: "English",
  },
  {
    id: 6,
    pupil: "Tim Weber",
    date: "March 15, 2025",
    startTime: "17:15",
    subject: "physics",
  },
];

export default async function Page() {
  const students = await prisma.user.findMany({
    where: {
      role: "student",
    },
  });

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
          <CardTitle className="text-xl font-bold">My Dashboard</CardTitle>
          <BookLessonModal
            students={students}
            trigger={<Button effect="gooeyLeft">Book a new lesson</Button>}
          />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-6">
            <PlannedHours />

            <div>
              <h2 className="text-lg font-medium mb-4">Past hours</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pupils</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start time</TableHead>
                    <TableHead>Academic subject</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastLessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell className="font-medium">
                        {lesson.pupil}
                      </TableCell>
                      <TableCell>{lesson.date}</TableCell>
                      <TableCell>{lesson.startTime}</TableCell>
                      <TableCell>{lesson.subject}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
