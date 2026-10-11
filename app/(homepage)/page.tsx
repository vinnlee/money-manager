"use client";

import Features from "@/components/homepage/features";
import Footer from "@/components/homepage/footer";
import Hero from "@/components/homepage/hero";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function Main() {
  return (
    <div className="relative min-h-screen bg-black">
      <ProgressiveBlur position="bottom" className="pointer-events-none fixed z-50" />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
