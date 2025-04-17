"use client";

import type React from "react";

import { Check, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Mock data - in a real app, this would come from your database
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
}

export function PricingForm({ id }: PricingFormProps) {
  const router = useRouter();
  const [newFeature, setNewFeature] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "hour",
    description: "",
    isRecommended: false,
    features: [] as string[],
  });

  useEffect(() => {
    if (id) {
      const plan = initialPricingPlans.find((plan) => plan.id === id);
      if (plan) {
        setFormData({
          name: plan.name,
          price: plan.price.toString(),
          unit: plan.unit,
          description: plan.description,
          isRecommended: plan.isRecommended,
          features: [...plan.features],
        });
      }
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isRecommended: checked }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would save to your database here
    console.log("Saving pricing plan:", formData);

    // Navigate back to the pricing dashboard
    router.push("/dashboard/pricing");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (€)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="hour">Per Hour</option>
                <option value="session">Per Session</option>
                <option value="month">Per Month</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isRecommended"
              checked={formData.isRecommended}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isRecommended">Mark as Recommended</Label>
          </div>
        </div>

        <div>
          <Label>Features</Label>
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
                {formData.features.map((feature, index) => (
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
                {formData.features.length === 0 && (
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
        <Button type="submit">{id ? "Update Plan" : "Create Plan"}</Button>
      </div>
    </form>
  );
}
