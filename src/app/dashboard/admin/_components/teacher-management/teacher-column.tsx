"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const TeacherColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
