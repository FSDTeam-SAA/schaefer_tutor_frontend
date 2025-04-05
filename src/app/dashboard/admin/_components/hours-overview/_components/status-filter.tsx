"use client";

import { cn } from "@/lib/utils";

export type Status = "planned" | "accepted" | "CARRIED_OUT" | "all";

interface StatusFilterProps {
  selectedStatus: Status;
  onStatusChange: (status: Status | "all") => void;
}

export default function StatusFilter({
  selectedStatus,
  onStatusChange,
}: StatusFilterProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Filter by status</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStatusChange("all")}
          className={cn(
            "px-4 py-2 text-sm rounded-md border",
            selectedStatus === "all"
              ? "bg-primary/10 border-primary/30 text-primary font-medium"
              : "bg-background hover:bg-muted"
          )}
        >
          All
        </button>
        <button
          onClick={() => onStatusChange("planned")}
          className={cn(
            "px-4 py-2 text-sm rounded-md border",
            selectedStatus === "planned"
              ? "bg-primary/10 border-primary/30 text-primary font-medium"
              : "bg-background hover:bg-muted"
          )}
        >
          Requested
        </button>
        <button
          onClick={() => onStatusChange("accepted")}
          className={cn(
            "px-4 py-2 text-sm rounded-md border",
            selectedStatus === "accepted"
              ? "bg-primary/10 border-primary/30 text-primary font-medium"
              : "bg-background hover:bg-muted"
          )}
        >
          Planned
        </button>
        <button
          onClick={() => onStatusChange("CARRIED_OUT")}
          className={cn(
            "px-4 py-2 text-sm rounded-md border",
            selectedStatus === "CARRIED_OUT"
              ? "bg-primary/10 border-primary/30 text-primary font-medium"
              : "bg-background hover:bg-muted"
          )}
        >
          Carried out
        </button>
      </div>
    </div>
  );
}
