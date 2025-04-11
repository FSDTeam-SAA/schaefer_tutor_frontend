"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface Props {
  data: User[];
  columns: ColumnDef<User>[];
}

const TeacherTableContainer = ({ data, columns }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search by transaction ID"
          value={String(table.getColumn("email")?.getFilterValue() ?? "")}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-[300px] focus-visible:ring-[#3a6f54]"
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TeacherTableContainer;
