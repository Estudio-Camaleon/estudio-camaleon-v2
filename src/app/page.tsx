"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TechCarousel from "@/components/home/TechCarousel";
import Portfolio from "@/components/home/Portfolio";
import Process from "@/components/home/Process";
import Footer from "@/components/layout/Footer";
import Testimony from "@/components/home/Testimony";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-bg-dark">
      <Navbar />
      <Hero />
      <TechCarousel />
      <Portfolio />
      <Process />
      <Testimony/>
      <Footer />
    </main>
  );
}
