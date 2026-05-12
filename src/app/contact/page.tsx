"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfessionalContactForm from "@/components/contact/ProfessionalContactForm";
import { FiZap, FiLock, FiCode, FiHeadphones } from "react-icons/fi";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: FiZap,
      title: "Respuesta rápida",
      description: "En menos de 24 horas",
    },
    {
      icon: FiLock,
      title: "Confidencialidad",
      description: "Tu idea está segura",
    },
    {
      icon: FiCode,
      title: "Soluciones a medida",
      description: "Adaptadas a tus necesidades",
    },
    {
      icon: FiHeadphones,
      title: "Acompañamiento",
      description: "En todo el proceso",
    },
  ];

  return (
    <main className="bg-bg-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <span className="section-badge animate-fade-in">CONTACTO</span>
          <h1 className="title-main text-5xl md:text-7xl mb-6 text-white mt-4">
            Trabajemos juntos
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8">
            ¿Tienes un proyecto en mente? Cuéntanos los detalles y empecemos a
            darle forma. Responderemos en menos de 24h.
          </p>
        </div>

        {/* Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 w-full max-w-5xl">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-surface-dark/50 border border-border-dark rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Formulario Section */}
      <section className="py-24 bg-bg-darker">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Cuéntanos sobre tu proyecto
            </h2>
            <p className="text-text-secondary">
              Completa el formulario con la mayor cantidad de detalles posible.
              Esto nos ayudará a entender mejor tu visión y proponer la mejor
              solución.
            </p>
          </div>

          <ProfessionalContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
