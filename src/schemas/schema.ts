import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
  phone: z.string(),
  name: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name must be at least 2 characters"),
});
export type SubjectSchemaType = z.infer<typeof subjectSchema>;

export const teacherCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  password: z.string(),
  subjectids: z.array(z.string()).nonempty("Please at least one item"),
});

export type TeacherCreateSchemaType = z.infer<typeof teacherCreateSchema>;
