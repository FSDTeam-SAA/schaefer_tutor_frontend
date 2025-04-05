"use client";

import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HoursTable from "./hours-table";
import StatusFilter, { Status } from "./status-filter";

export default function HoursOverview() {
  const [selectedStatus, setSelectedStatus] = useState<Status | "all">("all");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, isError } = useQuery<any[]>({
    queryKey: ["hours", selectedStatus],
    queryFn: async () =>
      fetch(`/api//admin/hours?status=${selectedStatus}`).then((res) =>
        res.json()
      ),
  });

  const handleStatusChange = (status: Status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hours overview</h1>
      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      {isError ? (
        <p>Something went wrong</p>
      ) : (
        <SkeletonWrapper isLoading={isLoading}>
          <HoursTable hours={data ?? []} />
        </SkeletonWrapper>
      )}
    </div>
  );
}
