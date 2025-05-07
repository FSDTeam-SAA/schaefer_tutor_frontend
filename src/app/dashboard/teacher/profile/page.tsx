import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MyStudentContainer from "./_components/my-students-container";
import TeacherProfileForm from "./_components/profile-form";

const Page = async () => {
  const currentUser = await auth();

  if (!currentUser) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: currentUser.user.id,
    },
  });

  const subjects = await prisma.subject.findMany();
  return (
    <div>
      <TeacherProfileForm user={user!} subjects={subjects} />

      <div className="mt-8 border rounded-lg p-6">
        <MyStudentContainer />
      </div>
    </div>
  );
};

export default Page;
