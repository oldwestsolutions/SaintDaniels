'use client'

import Hero from "@/components/features/home/Hero";
import Features from "@/components/features/home/Features";
import HowItWorks from "@/components/features/home/HowItWorks";
import Rewards from "@/components/features/home/Rewards";
import Testimonials from "@/components/features/home/Testimonials";
import PageTransition from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Features />
      <HowItWorks />
      <Rewards />
      <Testimonials />
    </PageTransition>
  );
} 