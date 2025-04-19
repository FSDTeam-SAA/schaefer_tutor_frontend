import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CardInfoContainer from "../_components/cards/card-info-container";

const Page = () => {
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
        <CardInfoContainer />
      </div>
    </div>
  );
};

export default Page;
