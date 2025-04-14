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
  subject: z.string(),
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
  subjects: z.array(z.string()),
});

export type StudentProfileSchemaType = z.infer<typeof StudentProfileSchema>;

export type TeacherProfileSchemaType = z.infer<typeof teacherProfileSchema>;

const dateTimeSchema = z.object({
  date: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a date.",
    }),
  time: z.string({
    required_error: "Please select a preferred time.",
  }),
});

export const freeTrialSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  // Array of date-time pairs
  preferredSlots: z.array(dateTimeSchema).min(1, {
    message: "Please add at least one preferred date and time.",
  }),
  notes: z.string().optional(),
});

export type FreeTrialSchemaType = z.infer<typeof freeTrialSchema>;
