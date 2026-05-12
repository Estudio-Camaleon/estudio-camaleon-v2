"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TechCarousel from "@/components/home/TechCarousel";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Process from "@/components/home/Process";
import Footer from "@/components/layout/Footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-bg-dark">
      <Navbar />
      <Hero />
      <TechCarousel />
      <Services />
      <Portfolio />
      <Process />
      <Footer />
    </main>
  );
}
