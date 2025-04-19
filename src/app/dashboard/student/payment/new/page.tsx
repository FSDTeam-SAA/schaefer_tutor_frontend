"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardInfoContainer from "../_components/cards/card-info-container";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <Button asChild variant="link" effect="hoverUnderline">
        <Link
          href="/dashboard/student/payment"
          className="flex items-center gap-x-3"
        >
          <ArrowLeft /> Back Now
        </Link>
      </Button>

      <div className="mt-5">
        <CardInfoContainer onSuccess={() => router.back()} />
      </div>
    </div>
  );
};

export default Page;
