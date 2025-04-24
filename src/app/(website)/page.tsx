import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TrialLessonForm from "./_components/free-trial-form";
import Hero from "./_components/hero";
import { PricingSection } from "./_components/pricing-section";
import Subjects from "./_components/subjects";
import Testmonial from "./_components/testmonial";
import WhySchafer from "./_components/why-schafer";

const NachhilfeLandingPage = async () => {
  const subjects = await prisma.subject.findMany();

  const cs = await auth();

  let user;

  if (cs?.user) {
    user = await prisma.user.findFirst({
      where: {
        id: cs.user.id,
      },
      select: {
        isGreeting: true,
        id: true,
        pricingId: true,
      },
    });

    if (!user?.isGreeting) {
      redirect(`/welcome/${user?.id}`);
    }
  }

  const pricing = await prisma.pricing.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Navigation */}

      {/* Hero Section + About Us Combined */}
      <Hero />

      {/* Features */}
      <WhySchafer />

      {/* Subjects */}
      <Subjects />

      {/* Pricing */}
      <PricingSection
        data={pricing}
        isLoggedIn={!!cs}
        purchasedPlan={user?.pricingId as string}
      />

      {/* Contact Form */}
      <div className="w-full bg-white py-20">
        <TrialLessonForm subjects={subjects} />
      </div>

      {/* Testimonials */}
      <Testmonial />

      {/* Footer */}

      <a
        href="https://res.cloudinary.com/dzlrpspps/raw/upload/v1745474607/payment_receipts/receipt_6809be3a492588022e144ded_in_1RHIsZPoiM4NGdAHvTKuEZjP_1745474606638.pdf"
        download="receipt.pdf"
      >
        Download Receipt
      </a>
    </div>
  );
};

export default NachhilfeLandingPage;
