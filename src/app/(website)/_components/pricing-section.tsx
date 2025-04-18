import { Pricing } from "@prisma/client";
import { PricingCard } from "./pricing-card";

interface Props {
  data: Pricing[];
}

export function PricingSection({ data }: Props) {
  if (data.length === 0) return;

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Our prices</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {data.map((plan) => (
            <PricingCard
              key={plan.id}
              title={plan.name}
              price={`${plan.price}€`}
              description={plan.description}
              features={plan.features}
              recommended={plan.isRecommended}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
