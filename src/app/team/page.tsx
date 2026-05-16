"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Aurora from "@/components/ui/Aurora";
import Image from "next/image";
import { teamData } from "@/data/team";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaCode,
  FaFingerprint,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function TeamPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            (entry.target as HTMLElement).dataset.memberIndex,
          );
          if (!Number.isNaN(index)) {
            setVisibleCards((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const philosophy = [
    {
      icon: FaFingerprint,
      title: "Identidad Única",
      desc: "No usamos plantillas. Cada proyecto nace de una hoja en blanco, respetando la esencia de tu marca.",
    },
    {
      icon: FaLightbulb,
      title: "Visión Adaptativa",
      desc: "Como un camaleón, nos mimetizamos con tu industria para entender tus desafíos antes de escribir una línea de código.",
    },
    {
      icon: FaRocket,
      title: "Evolución Constante",
      desc: "El entorno digital cambia cada segundo; nuestras habilidades y tecnologías también.",
    },
  ];

  return (
    <main className="bg-bg-dark min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* Fondo Aurora */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Aurora colorStops={["#39FF14", "#10B981"]} speed={0.5} />
      </div>

      <div className="relative z-10">
        {/* HERO: HISTORIA */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="text-5xl md:text-7xl mb-8 text-white font-black tracking-tighter leading-none">
                Vimos una{" "}
                <span className="text-primary italic">posibilidad</span>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl font-light leading-relaxed mb-6">
                Estudio Camaleón nació del inconformismo. De un grupo de
                desarrolladores que entendió que muchas experiencias digitales
                se habían vuelto predecibles, frías y sin identidad. Creamos
                Camaleón para romper con eso. Fusionamos desarrollo, diseño y
                creatividad para construir sitios que no solo se ven bien, sino
                que generan presencia, conexión y movimiento.
              </p>
              <p className="text-text-secondary text-lg font-light leading-relaxed">
                Creemos en una tecnología más humana. En interfaces que
                respiran. En experiencias que evolucionan junto a las marcas.
                Porque una página web no debería ser solo una vitrina digital.
                Debería sentirse viva.
              </p>
            </div>
            <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10 animate-in fade-in zoom-in duration-1000 shadow-2xl shadow-primary/5">
              <Image
                src="/images/team/img/historia.png"
                alt="Estudio Camaleón Historia"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-bg-dark via-transparent to-primary/10" />
            </div>
          </div>
        </section>

        {/* SECCIÓN: FILOSOFÍA (ADAPTABILIDAD) */}
        <section className="py-24 px-6 bg-surface-dark/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                ADN <span className="text-primary">Camaleón</span>
              </h2>
              <p className="text-text-secondary uppercase tracking-[0.3em] text-xs font-bold">
                Nuestra filosofía de trabajo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {philosophy.map((item, i) => (
                <div
                  key={i}
                  className="p-10 rounded-[3rem] bg-bg-dark/40 border border-white/5 hover:border-primary/40 transition-all duration-500 group"
                >
                  <item.icon className="text-4xl text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM GRID */}
        <section id="equipo" className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl text-white font-black tracking-tighter">
                El <span className="text-primary">Equipo</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamData.map((member, index) => (
                <div
                  key={member.name}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-member-index={index}
                  className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-surface-dark/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 group-hover:border-primary/30 group-hover:bg-surface-dark/60 overflow-hidden">
                    {/* Image Profile con efecto Camaleón */}
                    <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-6 border border-white/5 group-hover:border-primary/20 transition-colors">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className={`object-cover transition-all duration-1000 ${
                          visibleCards.has(index) ? "grayscale-0" : "grayscale"
                        } group-hover:scale-110 group-hover:grayscale-0`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="space-y-1 mb-6 relative z-10">
                      <h3 className="text-white font-black text-xl tracking-tight uppercase group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-primary/80 text-xs font-bold uppercase tracking-widest">
                        {member.role}
                      </p>
                      <p className="text-text-secondary text-sm italic font-light pt-2 leading-tight">
                        &quot;{member.specialty}&quot;
                      </p>
                    </div>

                    <div className="flex gap-4 relative z-10">
                      {member.links.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          className="text-white/40 hover:text-white transition-colors"
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          className="text-white/40 hover:text-primary transition-colors"
                        >
                          <FaLinkedinIn className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.instagram && (
                        <a
                          href={member.links.instagram}
                          target="_blank"
                          className="text-white/40 hover:text-pink-500 transition-colors"
                        >
                          <FaInstagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    {/* Decoración Neon */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
