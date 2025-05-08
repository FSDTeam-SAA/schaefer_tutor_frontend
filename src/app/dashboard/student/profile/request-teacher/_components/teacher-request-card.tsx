import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Lesson, User } from "@prisma/client";
import Image from "next/image";

type StudentWithLessons = User & {
  teacherLessons: Lesson[];
};

interface Props {
  data: StudentWithLessons;
}

const TeacherRequestCard = ({ data }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-gray-200">
                <Image
                  src={
                    data.image ??
                    "https://res.cloudinary.com/dgnustmny/image/upload/v1746088509/user-profile-icon-front-side_thwogs.jpg"
                  }
                  alt={data.name ?? "Name"}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-lg">{data.name}</h3>
              <p className="text-sm text-gray-500">
                {data.teacherLessons.length} completed lessons
              </p>
            </div>
          </CardContent>
        </Card>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to connect with this teacher?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Connecting will establish a teacher-student relationship and grant
            access to lessons, progress tracking, and communication features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TeacherRequestCard;
