import { prisma } from "@/lib/prisma";
import { AssignmentTableColumn } from "./_components/assignement-table-column";
import AssignmentTableContainer from "./_components/assignment-table-container";

const Page = async () => {
  const allRequests = await prisma.connection.findMany({
    where: {
      status: {
        in: ["pending", "rejected"],
      },
    },
    include: {
      teacher: true,
      student: true,
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Assignment</h1>

      <div>
        <AssignmentTableContainer
          data={allRequests ?? []}
          columns={AssignmentTableColumn}
        />
      </div>
    </div>
  );
};

export default Page;
