import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Trusted from "@/components/landing/Trusted";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trusted />
      <Features />
      <CTA />
    </>
  );
}