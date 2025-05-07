import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const MyStudentCard = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-gray-200">
            <Image
              src={"/placeholder.svg?height=80&width=80"}
              alt={`${name}'s profile`}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-medium text-lg">Alex Johnson</h3>
          <p className="text-sm text-gray-500">{12} completed lessons</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyStudentCard;
