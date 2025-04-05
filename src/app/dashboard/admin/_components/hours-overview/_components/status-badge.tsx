import { cn } from "@/lib/utils";
import { $Enums } from "@prisma/client";

interface StatusBadgeProps {
  status: $Enums.LessonStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-1 text-xs font-medium rounded-md",
        status === "accepted" && "bg-blue-100 text-blue-800",
        status === "planned" && "bg-yellow-100 text-yellow-800"
        // status === "CARRIED_OUT" && "bg-green-100 text-green-800"
      )}
    >
      {status === "accepted" && "Planned"}
      {status === "planned" && "Requested"}
      {/* {status === "CARRIED_OUT" && "Carried out"} */}
    </span>
  );
}
