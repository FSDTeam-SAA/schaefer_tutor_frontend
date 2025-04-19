import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CardConnectRemoveContainer from "./_components/cards/card-connet-remove-container";

const Page = async () => {
  const cu = await auth();

  if (!cu?.user || !cu.user.id) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: cu.user.id,
    },
    select: {
      stripePaymentMethodId: true,
      stripeCustomerId: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Payment History</h1>
        <CardConnectRemoveContainer pmid={user?.stripePaymentMethodId} />
      </div>

      <div className="bg-white rounded-lg border shadow-sm"></div>
    </div>
  );
};

export default Page;
