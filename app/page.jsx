import Hero from "./components/Hero";
import ServicesSection from "./components/Servicessection";
import WhyChooseUs from "./components/WhyChooseUs";
import HVACBentoSection from "./components/HvaBentoSection";
import TestimonialsSection from "./components/Testimonials";
import FAQSection from "./components/FAQ";

export default function Page() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <HVACBentoSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
