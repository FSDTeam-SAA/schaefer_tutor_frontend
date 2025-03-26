"use client";

// Packages
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

// Local imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { RegistrationAction } from "@/action/authentication";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
  phone: z.string(),
  name: z.string(),
});

export default function RegistrationForm() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<true | false>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    startTransition(() => {
      RegistrationAction(values)
        .then((res) => {
          if (!res.success) {
            toast.error(res.message || "Registration failed.");
          } else {
            toast.success("Registration successful!");
            router.push("/"); // 👈 Use router to navigate
          }
        })
        .catch((err) => {
          toast.error("Something went wrong.");
          console.error(err);
        });
    });
  }

  const isLoading = isPending || loading;

  return (
    <div className="mt-[40px]">
      {/* <SocialLogin /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-[16px] pt-[24px]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Name "
                    {...field}
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Phone "
                    {...field}
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                  />
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
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                    {...field}
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
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    {...field}
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-[40px]"
            effect="gooeyLeft"
            disabled={isLoading}
            variant={isLoading ? "outline" : "default"}
          >
            {isLoading && <Loader2 className=" mr-2  animate-spin" />}
            Registration
          </Button>
        </form>
      </Form>

      <p className="mt-[32px] text-center text-[14px] font-normal leading-[16.94px] text-[#9CA3AF]">
        Don&apos;t have an account?{" "}
        <Link
          href={`/onboarding`}
          className="font-medium text-[#1D3557] hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
