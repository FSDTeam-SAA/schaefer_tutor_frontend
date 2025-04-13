import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { FreeTrialReqColumns } from "./_components/free-trial-column";
import FreeTrialRequestTableContainer from "./_components/free-trial-request-table-container";

async function getUser(id: string) {
  const data = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return data;
}

async function getMatchingFreeTrials(subjects: string[]) {
  const trials = await prisma.freeTrialReq.findMany({
    where: {
      status: "pending",
      subject: {
        in: subjects,
      },
    },
    include: {
      preferredSlots: true,
    },
  });

  return trials;
}

const Page = async () => {
  const currentUser = await auth();
  if (!currentUser) redirect("/login");
  const user = await getUser(currentUser.user.id as string);
  const mySubjects = user?.subjects; // array of string

  if (!mySubjects) notFound();

  const matchingTrials = await getMatchingFreeTrials(mySubjects);

  return (
    <div>
      <div>
        <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
          Free Trial Requests
        </h2>
        <p className="text-tourHub-green-dark text-base mb-1">
          Manage your free trial requests
        </p>
      </div>
      <FreeTrialRequestTableContainer
        data={matchingTrials}
        columns={FreeTrialReqColumns}
      />
    </div>
  );
};

export default Page;
