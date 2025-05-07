import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import MyStudentCard from "./my-student-card";

// Sample student data - replace with your actual data source
const students = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "/placeholder.svg?height=80&width=80",
    completedLessons: 12,
  },
  {
    id: 2,
    name: "Sarah Williams",
    image: "/placeholder.svg?height=80&width=80",
    completedLessons: 8,
  },
  {
    id: 3,
    name: "Michael Chen",
    image: "/placeholder.svg?height=80&width=80",
    completedLessons: 15,
  },
  {
    id: 4,
    name: "Emma Davis",
    image: "/placeholder.svg?height=80&width=80",
    completedLessons: 6,
  },
];

export default function MyStudentContainer() {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Students</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Request a student
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {students.map((student) => (
          <MyStudentCard key={student.id} />
        ))}
      </div>
    </div>
  );
}
