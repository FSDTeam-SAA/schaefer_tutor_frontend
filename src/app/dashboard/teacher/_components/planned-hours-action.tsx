"use client";
import { updateLessonStatusAction } from "@/action/lesson";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lesson, Subject, User } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import BookLessonModal from "./add-lesson-modal";

interface Props {
  subjects: Subject[];
  students: User[];
  data: Lesson;
}

const PlannedHoursAction = ({ data, subjects, students }: Props) => {
  const [cancelPending, startTransition] = useTransition();

  const onCanel = () => {
    startTransition(() => {
      updateLessonStatusAction(data.id, "canceled").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success("Lesson caneled successfully");
        }
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-2">
        <DropdownMenuItem asChild>
          <BookLessonModal
            subjects={subjects ?? []}
            students={students ?? []}
            initialData={data}
            trigger={
              <Button className="w-full" size="sm">
                Move
              </Button>
            }
          />
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button
            variant={cancelPending ? "outline" : "destructive"}
            className="w-full cursor-pointer"
            size="sm"
            disabled={cancelPending}
            onClick={onCanel}
          >
            {cancelPending ? "Cancelling..." : "Cancel"}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="bg-green-500 text-white py-1 px-3 rounded-md w-full text-center">
            At the moment
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlannedHoursAction;
