"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Check, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { createPricing } from "@/action/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PricingFormValues, pricingSchema } from "@/schemas/schema";
import { Pricing } from "@prisma/client";
import { toast } from "sonner";

// --- Zod Schema ---

const initialPricingPlans = [
  {
    id: "1",
    name: "Individual lessons",
    price: 30,
    unit: "hour",
    description: "Flexible and non-binding, ideal for occasional support.",
    isRecommended: false,
    features: [
      "Flexible booking",
      "Individual appointment selection",
      "No contract",
    ],
  },
  {
    id: "2",
    name: "Monthly package",
    price: 25,
    unit: "hour",
    description: "Minimum 4 hours per month, each additional hour also 25€.",
    isRecommended: true,
    features: [
      "20% savings compared to individual lessons",
      "Guaranteed regular appointments",
      "Continuous learning progress",
      "Personal learning plan",
    ],
  },
];

interface PricingFormProps {
  id?: string;
  initialvalue?: Pricing;
}

export function PricingForm({ id, initialvalue }: PricingFormProps) {
  const router = useRouter();
  const [newFeature, setNewFeature] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      isRecommended: false,
      features: [],
    },
  });

  const { handleSubmit, setValue, getValues, control, reset, watch } = form;

  useEffect(() => {
    if (id) {
      const plan = initialPricingPlans.find((plan) => plan.id === id);
      if (plan) {
        reset({
          name: plan.name,
          price: plan.price.toString(),
          description: plan.description,
          isRecommended: plan.isRecommended,
          features: plan.features,
        });
      }
    }
  }, [id, reset]);

  const addFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed) {
      setValue("features", [...getValues("features"), trimmed]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const updated = [...getValues("features")];
    updated.splice(index, 1);
    setValue("features", updated);
  };

  const onSubmit = (data: PricingFormValues) => {
    if (initialvalue) {
    } else {
      startTransition(() => {
        createPricing(data).then((res) => {
          if (!res.success) {
            toast.error(res.message);
          }

          // handle success
          toast.success(res.message);
          form.reset();
        });
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (€)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="isRecommended"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="mb-0">Mark as Recommended</FormLabel>
                </FormItem>
              )}
            />
          </div>

          {/* Features */}
          <div>
            <FormLabel>Features</FormLabel>
            <Card className="mt-2">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Add a feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <Button type="button" size="sm" onClick={addFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <ul className="space-y-2">
                  {watch("features").map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-muted p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                  {watch("features").length === 0 && (
                    <li className="text-muted-foreground text-center py-2">
                      No features added yet
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/pricing")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {id ? "Update Plan" : "Create Plan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
