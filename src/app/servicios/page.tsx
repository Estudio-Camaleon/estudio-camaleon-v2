"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/home/Services";

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-bg-dark min-h-screen">
      <Navbar />

      <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-10 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(46,204,112,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(46,204,112,0.08),_transparent_24%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-badge">Servicios</span>
          <h1 className="title-main text-4xl sm:text-5xl md:text-7xl mt-4 mb-6 text-white leading-[0.95]">
            Servicios pensados para crecer
          </h1>
          <p className="text-text-secondary text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Construimos productos digitales con foco en claridad, rendimiento y
            resultado real para tu negocio.
          </p>
        </div>
      </section>

      <Services />

      <Footer />
    </main>
  );
}