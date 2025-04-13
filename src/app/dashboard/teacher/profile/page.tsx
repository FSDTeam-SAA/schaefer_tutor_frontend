import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeacherProfileForm from "./_components/profile-form";

const Page = async () => {
  const currentUser = await auth();

  if (!currentUser) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: currentUser.user.id,
    },
  });
  return (
    <div>
      <TeacherProfileForm user={user!} />
    </div>
  );
};

export default Page;
