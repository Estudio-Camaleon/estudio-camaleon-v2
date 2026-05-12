"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Aurora from "@/components/ui/Aurora";
import Image from "next/image";
import { teamData } from "@/data/team";
import { FaGithub, FaLinkedinIn, FaInstagram, FaCode } from "react-icons/fa";

export default function TeamPage() {
  return (
    <main className="bg-bg-dark min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* Fondo Aurora */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Aurora colorStops={["#39FF14", "#10B981"]} speed={0.5} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header de Sección */}
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="section-badge mb-6 inline-flex items-center gap-2">
              <FaCode className="w-4 h-4 text-primary" />
              Mentes Creativas
            </span>
            <h1 className="title-main text-5xl md:text-7xl mb-6 text-white font-black tracking-tighter">
              Nuestro <span className="text-primary">Equipo</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Un grupo multidisciplinario apasionado por transformar ideas en
              productos digitales excepcionales, escalables y con un diseño
              impecable.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member, index) => (
              <div
                key={member.name}
                className="group relative animate-in fade-in zoom-in duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card Container */}
                <div className="relative bg-surface-dark/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 group-hover:border-primary/30 group-hover:bg-surface-dark/60">
                  {/* Image Profile */}
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-6 border border-white/5 group-hover:border-primary/20 transition-colors">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Info */}
                  <div className="space-y-1 mb-6">
                    <h3 className="text-white font-black text-xl tracking-tight uppercase">
                      {member.name}
                    </h3>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">
                      {member.role}
                    </p>
                    <p className="text-text-secondary text-sm italic font-light pt-2">
                      &quot;{member.specialty}&quot;
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4">
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

                  {/* Neon Glow effect on hover */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
