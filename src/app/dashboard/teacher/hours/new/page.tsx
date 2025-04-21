import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LessonCreateForm from "./_components/lesson-create-form";

const Page = async () => {
  const currentUser = await auth();

  if (!currentUser) redirect("/login");
  const subjects = await prisma.subject.findMany();
  const students = await prisma.user.findMany({
    where: {
      role: "student",
      pricingId: {
        not: null,
      },
      stripePaymentMethodId: {
        not: null,
      },
      stripeCustomerId: {
        not: null,
      },
    },
  });

  const myInfo = await prisma.user.findFirst({
    where: {
      id: currentUser.user.id,
    },
  });

  const mySubjects = myInfo?.subjects;

  const filteredSubjects = subjects.filter((s) => mySubjects?.includes(s.name));
  return (
    <div>
      <LessonCreateForm subjects={filteredSubjects} students={students} />
    </div>
  );
};

export default Page;
