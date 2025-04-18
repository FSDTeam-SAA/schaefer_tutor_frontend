"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export function PricingTable() {
  const [pricingPlans, setPricingPlans] = useState(initialPricingPlans);

  const handleDelete = (id: string) => {
    setPricingPlans(pricingPlans.filter((plan) => plan.id !== id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Plan Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Features</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pricingPlans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell className="font-medium">{plan.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="text-xl font-bold">{plan.price}€</span>
                <span className="text-muted-foreground ml-1">
                  / {plan.unit}
                </span>
              </div>
            </TableCell>
            <TableCell className="max-w-[300px]">{plan.description}</TableCell>
            <TableCell>
              <ul className="list-disc pl-5 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              {plan.isRecommended ? (
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  Recommended
                </Badge>
              ) : (
                <Badge variant="outline">Standard</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/dashboard/admin/price-management/edit/${plan.id}`}
                >
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the &quot;{plan.name}&quot;
                        pricing plan. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(plan.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
