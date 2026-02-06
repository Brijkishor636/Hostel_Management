import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import RoleSection from "@/components/Home/RoleSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <FeaturesSection/>
      <RoleSection/>
      <TestimonialsSection/>
      <HowItWorks/>
    </div>
  );
}
