import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the type for our data
type PastSession = {
  id: string;
  date: string;
  startTime: string;
  academicSubject: string;
  teacher: string;
};

// Sample data
const pastSessions: PastSession[] = [
  {
    id: "1",
    date: "March 20, 2025",
    startTime: "4:00 PM",
    academicSubject: "mathematics",
    teacher: "Simon Schäfer",
  },
  {
    id: "2",
    date: "March 18, 2025",
    startTime: "2:30 p.m.",
    academicSubject: "mathematics",
    teacher: "Simon Schäfer",
  },
  {
    id: "3",
    date: "March 15, 2025",
    startTime: "5:15 p.m.",
    academicSubject: "mathematics",
    teacher: "Simon Schäfer",
  },
];

export default function PastHours() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Past hours</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>Academic subject</TableHead>
            <TableHead>Teacher</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.date}</TableCell>
              <TableCell>{session.startTime}</TableCell>
              <TableCell>{session.academicSubject}</TableCell>
              <TableCell>{session.teacher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
