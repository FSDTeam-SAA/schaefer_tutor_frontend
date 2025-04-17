import { PricingForm } from "../../_components/pricing-form";

export default function EditPricingPlan({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Pricing Plan</h1>
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <PricingForm id={params.id} />
      </div>
    </div>
  );
}
