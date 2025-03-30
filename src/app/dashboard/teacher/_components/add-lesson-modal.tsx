"use client";
import { createLessonAction, editLessonAction } from "@/action/lesson";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { cn } from "@/lib/utils";
import { LessonCreateSchema, lessonCreateSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lesson, User } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BookLessonModalProps {
  trigger: ReactNode;
  students: User[];
  initialData?: Lesson;
}

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

// Define the form schema with Zod

export default function BookLessonModal({
  trigger,
  students,
  initialData,
}: BookLessonModalProps) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<LessonCreateSchema>({
    resolver: zodResolver(lessonCreateSchema),
    defaultValues: {
      studentId: initialData?.studentId ?? "",
      time: initialData?.time ?? "",
      date: initialData?.date ?? new Date(),
    },
  });

  function onSubmit(data: LessonCreateSchema) {
    if (initialData) {
      startTransition(() => {
        editLessonAction(data, initialData?.id).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          } else {
            toast.success(res.message);
            form.reset();
            setOpen(false);
          }
        });
      });
    } else {
      startTransition(() => {
        createLessonAction(data).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          } else {
            toast.success(res.message);
            form.reset();
            setOpen(false);
          }
        });
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {initialData ? "Edit lesson" : "Book a new lesson"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Bitte wählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "MM/dd/yyyy")
                            : "mm/dd/yyyy"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Uhrzeit wählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stunden dauern immer 60 Minuten
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <SubmitButton
                text={initialData ? "Save Now" : "Create lesson"}
                pending={pending}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
