import { Account } from "@/types/account";
import { ColumnDef } from "@tanstack/react-table";

export const PaymentColumns: ColumnDef<Account>[] = [
  {
    header: "Student",
    cell: () => <p>Monir </p>,
  },
];
