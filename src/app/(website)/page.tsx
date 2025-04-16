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

  if (cs?.user) {
    const user = await prisma.user.findFirst({
      where: {
        id: cs.user.id,
      },
      select: {
        isGreeting: true,
        id: true,
      },
    });

    if (!user?.isGreeting) {
      redirect(`/welcome/${user?.id}`);
    }
  }

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
      <PricingSection />

      {/* Contact Form */}
      <div className="w-full bg-white py-20">
        <TrialLessonForm subjects={subjects} />
      </div>

      {/* Testimonials */}
      <Testmonial />

      {/* Footer */}
    </div>
  );
};

export default NachhilfeLandingPage;
