import { Lesson, User } from "@prisma/client";

export type Account = {
  studentId: string;
  lessons: Lesson[];
  student: User;
};
