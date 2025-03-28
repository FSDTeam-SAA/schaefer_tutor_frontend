"use client";

import { updateLessonStatusAction } from "@/action/lesson";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { toast } from "sonner";

interface TableActionsProps {
  id: string;
}

export function TableActions({ id }: TableActionsProps) {
  const [acceptPending, startAcceptTransition] = useTransition();
  const [cancelPending, startCancelTransition] = useTransition();

  const handleAccept = () => {
    startAcceptTransition(() => {
      updateLessonStatusAction(id, "accepted").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(
            "Lesson successfully accepted! You can now proceed with the scheduled session."
          );
        }
      });
    });
  };

  const handleRefuse = () => {
    startCancelTransition(() => {
      updateLessonStatusAction(id, "canceled").then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(
            "Lesson successfully canceled. You can reschedule or book another session."
          );
        }
      });
    });
  };

  // Otherwise, show the action buttons
  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        className={cn(
          "bg-green-500 hover:bg-green-600 text-white",
          cancelPending && "cursor-not-allowed"
        )}
        disabled={acceptPending}
        onClick={handleAccept}
      >
        Accept
      </Button>
      <Button
        size="sm"
        variant="destructive"
        className={cn(
          "bg-red-500 hover:bg-red-600 text-white",
          acceptPending && "cursor-not-allowed"
        )}
        onClick={handleRefuse}
        disabled={cancelPending}
      >
        Refuse
      </Button>
    </div>
  );
}
