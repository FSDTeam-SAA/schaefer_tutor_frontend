import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
  phone: z.string(),
  name: z.string(),
  role: z.enum(["student", "teacher"]),
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
  subjectids: z.string().nonempty("Please at least one item"),
});

export type TeacherCreateSchemaType = z.infer<typeof teacherCreateSchema>;

export const lessonCreateSchema = z.object({
  studentId: z.string({
    required_error: "Bitte wählen Sie einen Schüler aus",
  }),
  date: z.date({
    required_error: "Bitte wählen Sie ein Datum aus",
  }),
  time: z.string({
    required_error: "Bitte wählen Sie eine Startzeit aus",
  }),
});

export type LessonCreateSchema = z.infer<typeof lessonCreateSchema>;

export const StudentProfileSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});
export const teacherProfileSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  subjects: z.string(),
});

export type StudentProfileSchemaType = z.infer<typeof StudentProfileSchema>;

export type TeacherProfileSchemaType = z.infer<typeof teacherProfileSchema>;
