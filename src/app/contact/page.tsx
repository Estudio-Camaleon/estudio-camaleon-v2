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
    { icon: FiZap, title: "Respuesta rápida", desc: "En menos de 24h" },
    { icon: FiLock, title: "Confidencialidad", desc: "Tu idea está segura" },
    { icon: FiCode, title: "A medida", desc: "Soluciones únicas" },
    { icon: FiHeadphones, title: "Soporte 1:1", desc: "Acompañamiento" },
  ];

  return (
    <main className="bg-bg-dark min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div>
        
      </div>
      {/* Contenedor Split - Full Width total */}
      <section className="flex-grow grid grid-cols-1 lg:grid-cols-2 pt-20 lg:pt-20">
        {/* COLUMNA IZQUIERDA: Identidad y Valor */}
        <div className="relative flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 xl:px-32 bg-bg-dark overflow-hidden border-b lg:border-b-0 lg:border-r border-border-dark/50">
          {/* Decoración de fondo (Glows) */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tighter">
              Hagamos algo <br />
              <span className="text-primary italic">legendario.</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-md leading-relaxed">
              ¿Tienes una visión? Nosotros el código y el diseño para hacerla
              realidad.
            </p>

            {/* Beneficios en Mini-Grid */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-surface-dark/30 border border-border-dark/50 hover:border-primary/30 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-sm">{item.title}</h4>
                  <p className="text-text-secondary text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Acción (Formulario) */}
        <div className="bg-bg-darker flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 xl:px-32 relative">
          <div className="max-w-2xl w-full mx-auto lg:mx-0">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Detalles del proyecto
              </h2>
              <p className="text-text-secondary text-sm">
                Cuanto más nos cuentes, mejor será nuestra propuesta inicial.
              </p>
            </div>
            {/* El formulario ya tiene sus propios estilos internos de inputs */}
            <div className="relative">
              <ProfessionalContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
