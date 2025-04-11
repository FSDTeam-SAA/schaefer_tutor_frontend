"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const TeacherColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
