"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { subjectSchema, SubjectSchemaType } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { CreateSubjectAction } from "@/action/subject";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { toast } from "sonner";

export function AddSubjectDialog() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<SubjectSchemaType>({
    resolver: zodResolver(subjectSchema),
  });

  function onSubmit(values: SubjectSchemaType) {
    startTransition(() => {
      CreateSubjectAction(values)
        .then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          } else {
            form.reset();
            toast.success(res.message);
            setOpen(false);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add new Subject</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Subject</DialogTitle>
          <DialogDescription>
            Enter the subject name and click save.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Subject Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <SubmitButton text="Create Subject" pending={isPending} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
