import { User } from "@prisma/client";

export interface Account {
  studentId: string;
  lessons: number;
  student: User;
}
[];
