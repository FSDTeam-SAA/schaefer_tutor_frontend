import { prisma } from "@/lib/prisma";
import { StudentColumns } from "./student-column";
import StudentTableContainer from "./student-table-container-";

const StudentManagement = async () => {
  const teachers = await prisma.user.findMany({
    where: {
      role: "student",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="my-5">
      <StudentTableContainer data={teachers ?? []} columns={StudentColumns} />
    </div>
  );
};

export default StudentManagement;
