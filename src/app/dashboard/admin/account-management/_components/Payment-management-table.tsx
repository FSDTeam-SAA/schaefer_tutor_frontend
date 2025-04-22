"use client";

import { Account } from "@/types/account";

interface Props {
  data: Account[];
}

const PaymentManagementTable = ({ data }: Props) => {
  console.log(data);
  return <div>AccountManagementTable</div>;
};

export default PaymentManagementTable;
