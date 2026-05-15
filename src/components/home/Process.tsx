"use client";

import { motion } from "framer-motion";
import {
  IoSpeedometerOutline,
  IoShieldCheckmarkOutline,
  IoGitBranchOutline,
  IoChatbubbleEllipsesOutline,
  IoSyncOutline,
} from "react-icons/io5";
import { scrumSteps } from "@/data/process";

const Process = () => {
  const trustBadges = [
    {
      icon: IoSpeedometerOutline,
      title: "Velocidad",
      desc: "Entregas constantes cada 2 semanas.",
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: "Flexibilidad",
      desc: "Adaptación a cambios y nuevas prioridades.",
    },
    {
      icon: IoGitBranchOutline,
      title: "Comunicación",
      desc: "Colaboración constante y transparente.",
    },
    {
      icon: IoChatbubbleEllipsesOutline,
      title: "Transparencia",
      desc: "Visibilidad total del progreso real.",
    },
    {
      icon: IoSyncOutline,
      title: "Iteración",
      desc: "Valor entregado desde el primer sprint.",
    },
  ];

  return (
    <section
      id="proceso"
      className=" bg-bg-dark relative overflow-hidden w-full flex flex-col items-center"
    >
      {/* Glow de fondo masivo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 w-full max-w-[1400px] h-[800px] bg-primary/5 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-24 xl:px-32">
        {/* Header Seccion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-end mb-24 md:mb-40">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-badge mb-6 inline-block tracking-[0.4em] text-xs">
              MÉTODO ESTUDIO CAMALEÓN
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black text-white tracking-tighter leading-[0.95] md:leading-[1]">
              Desarrollamos con <br />
              <span className="text-primary italic whitespace-nowrap">
                Mutación Ágil
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-5 lg:pb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-text-secondary text-lg md:text-2xl leading-relaxed border-l-2 border-primary/30 pl-6 md:pl-10">
              Scrum nos permite adaptarnos rápidamente a los cambios, mejorar
              continuamente y entregar valor real en cada{" "}
              <span className="text-white font-medium">iteración</span>.
            </p>
          </motion.div>
        </div>

        {/* Pasos de Proceso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12 lg:gap-24 xl:gap-32 mb-32 md:mb-40">
          {scrumSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="group relative flex flex-col"
              >
                {/* Visual: Número + Icono */}
                <div className="relative mb-8 md:mb-12">
                  <span className="text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none text-white/[0.02] group-hover:text-primary/[0.06] transition-all duration-1000 select-none inline-block">
                    {step.number}
                  </span>

                  <div
                    className={`absolute bottom-4 md:bottom-12 left-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-500 backdrop-blur-xl shadow-2xl group-hover:shadow-primary/20`}
                  >
                    <IconComponent className="w-7 h-7 md:w-9 md:h-9 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="space-y-4 md:space-y-6 relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter flex items-center gap-4">
                    <span className="w-2 h-2 bg-primary rounded-full group-hover:scale-[3] transition-all duration-500" />
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-base md:text-lg lg:text-xl opacity-70 group-hover:opacity-100 transition-all duration-500">
                    {step.description}
                  </p>
                </div>

                {/* Línea de progreso */}
                <div className="mt-10 h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent w-0 group-hover:w-full transition-all duration-[1.5s] ease-in-out" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {trustBadges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group/badge bg-surface-dark/20 border border-white/5 p-6 md:p-8 rounded-[2rem] flex flex-col items-center text-center gap-4 md:gap-6 hover:bg-surface-dark/40 hover:border-primary/20 transition-all duration-500 backdrop-blur-sm"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover/badge:bg-primary/10 transition-colors">
                <badge.icon className="text-primary text-2xl md:text-3xl group-hover/badge:scale-110 transition-transform" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.2em]">
                  {badge.title}
                </h4>
                <p className="text-text-secondary text-[11px] md:text-xs leading-relaxed opacity-60 group-hover/badge:opacity-100 transition-opacity">
                  {badge.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
