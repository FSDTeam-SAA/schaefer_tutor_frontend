import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/");

  return <div>{children}</div>;
};

export default DashboardLayout;
