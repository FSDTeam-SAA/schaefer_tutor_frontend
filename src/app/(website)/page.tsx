import FreeTrialForm from "./_components/free-trial-form";
import Hero from "./_components/hero";
import { PricingSection } from "./_components/pricing-section";
import Subjects from "./_components/subjects";
import Testmonial from "./_components/testmonial";
import WhySchafer from "./_components/why-schafer";

const NachhilfeLandingPage = () => {
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
        <FreeTrialForm />
      </div>

      {/* Testimonials */}
      <Testmonial />

      {/* Footer */}
    </div>
  );
};

export default NachhilfeLandingPage;
