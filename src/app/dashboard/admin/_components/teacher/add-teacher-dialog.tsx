"use client";

import {
  TeacherEditAction,
  TeacherRegistrationAction,
} from "@/action/authentication";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { PasswordInput } from "@/components/ui/password-input";
import { SubmitButton } from "@/components/ui/submit-button";
import { teacherCreateSchema, TeacherCreateSchemaType } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subject, User } from "@prisma/client";
import { ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  subjects: Subject[];
  trigger: ReactNode;
  initialData?: User;
}

export function AddTeacherDialog({ subjects, trigger, initialData }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const form = useForm<TeacherCreateSchemaType>({
    resolver: zodResolver(teacherCreateSchema),
    defaultValues: {
      subjectids: initialData?.subjects ?? [],
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
    },
  });

  function onSubmit(values: TeacherCreateSchemaType) {
    if (initialData) {
      startTransition(() => {
        TeacherEditAction(values)
          .then((res) => {
            if (!res.success) {
              toast.error(res.message);
            } else {
              toast.success(res.message);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setOpen(false);
          });
      });
    } else {
      startTransition(() => {
        TeacherRegistrationAction(values)
          .then((res) => {
            if (!res.success) {
              toast.error(res.message);
            } else {
              toast.success(res.message);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setOpen(false);
          });
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit teacher" : "Add new teacher"}
          </DialogTitle>
          <DialogDescription>
            Enter the details of the new teacher. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      type="email"
                      {...field}
                      disabled={!!initialData}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {initialData ? "New Password" : "Password"}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subjectids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="w-full"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select Subject" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {subjects.map((item) => (
                            <MultiSelectorItem value={item.name} key={item.id}>
                              {item.name}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-5">
              <SubmitButton
                text={initialData ? "Save Now" : "Add Teacher"}
                pending={pending}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
