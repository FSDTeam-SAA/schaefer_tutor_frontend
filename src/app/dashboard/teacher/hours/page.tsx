import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import BookLessonModal from "../_components/add-lesson-modal";
import PastTeacherHours from "../_components/past-hours";
import PlannedHours from "../_components/planned-hours";

const Page = async () => {
  const students = await prisma.user.findMany({
    where: {
      role: "student",
    },
  });
  return (
    <div className="">
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
};

export default Page;
