import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Payment Card</h1>
        <Link href="/dashboard/student/payment/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Card
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm"></div>
    </div>
  );
};

export default Page;
