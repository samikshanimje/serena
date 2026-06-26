import AIPreview from "@/components/landing/AIPreview";
import CTA from "@/components/landing/CTA";
import DashboardPreview from "@/components/landing/DashboardPreview";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import MoodSection from "@/components/landing/MoodSection";
import Testimonials from "@/components/landing/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MoodSection />
      <Features />
      <AIPreview />
      <DashboardPreview />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}