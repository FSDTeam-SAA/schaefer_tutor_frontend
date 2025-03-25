import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
  highlight?: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  perHour?: boolean;
  description?: string;
  features: PricingFeature[];
  recommended?: boolean;
  className?: string;
}

export function PricingCard({
  title,
  price,
  perHour = true,
  description,
  features,
  recommended = false,
  className,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "rounded-lg border shadow-sm overflow-hidden relative p-0",
        className
      )}
    >
      <CardHeader className="p-0">
        {recommended && (
          <div className="bg-primary text-primary-foreground py-2 text-center font-medium absolute w-full">
            Recommended
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className=" space-y-6 pt-14">
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-primary">{price}</span>
              {perHour && (
                <span className="ml-1 text-muted-foreground"> / hour</span>
              )}
            </div>
            {description && (
              <p className="mt-4 text-muted-foreground">{description}</p>
            )}
          </div>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                <span>
                  {feature.highlight ? (
                    <>
                      <span className="font-medium">{feature.highlight}</span>
                      {feature.text}
                    </>
                  ) : (
                    feature.text
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full ">Book now</Button>
      </CardFooter>
    </Card>
  );
}
