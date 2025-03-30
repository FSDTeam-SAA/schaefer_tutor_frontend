import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { prisma } from "@/lib/prisma";
import BookLessonModal from "./_components/add-lesson-modal";
import PastTeacherHours from "./_components/past-hours";
import PlannedHours from "./_components/planned-hours";

// Sample data for past lessons

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
            <PastTeacherHours />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
