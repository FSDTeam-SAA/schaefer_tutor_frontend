import { PricingCard } from "./pricing-card";

export function PricingSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Our prices</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <PricingCard
            title="Individual lessons"
            price="30€"
            description="Flexible and non-binding, ideal for occasional support."
            features={[
              { text: "Flexible booking" },
              { text: "Individual appointment selection" },
              { text: "No contract" },
            ]}
          />

          <PricingCard
            title="Monthly package"
            price="25€"
            description="Minimum 4 hours per month, each additional hour also 25€."
            features={[
              {
                highlight: "20% savings",
                text: "compared to individual lessons",
              },
              { text: "Guaranteed regular appointments" },
              { text: "Continuous learning progress" },
              { text: "Personal learning plan" },
            ]}
            recommended={true}
            className="border-primary"
          />
        </div>
      </div>
    </section>
  );
}
