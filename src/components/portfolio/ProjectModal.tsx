"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  FiMonitor,
  FiSmartphone,
  FiArrowLeft,
  FiExternalLink,
  FiImage,
} from "react-icons/fi";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    imgLaptop?: string;
    imgMobile?: string;
    link: string;
  } | null;
}

type ViewMode = "selection" | "desktop" | "mobile";

// Componente para cuando no hay imagen disponible
const PlaceholderContent = ({ mode }: { mode: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-bg-dark/50 gap-4 p-10 text-center">
    <div className="relative w-24 h-24 opacity-20 animate-pulse">
      <Image
        src="/icons/Logowebjunto.svg"
        alt="Estudio Camaleón"
        fill
        className="object-contain grayscale"
      />
    </div>
    <div className="space-y-2">
      <p className="text-primary/50 font-bold uppercase tracking-widest text-[10px]">
        Preview no disponible
      </p>
      <p className="text-white/20 text-xs max-w-[200px]">
        Estamos procesando las capturas de la versión {mode} para este proyecto.
      </p>
    </div>
  </div>
);

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const [view, setView] = useState<ViewMode>("selection");
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setView("selection");
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }).to(
        contentRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.1",
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      {/* Overlay con desenfoque profundo */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-bg-dark/95 backdrop-blur-xl opacity-0"
      />

      {/* Contenedor Principal */}
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl bg-surface-dark border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl opacity-0 scale-95 translate-y-10 flex flex-col max-h-[90vh]"
      >
        {/* Header Dinámico */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-bg-dark/50 shrink-0">
          <div className="flex items-center gap-4">
            {view !== "selection" && (
              <button
                onClick={() => setView("selection")}
                className="flex items-center gap-2 text-primary hover:text-white transition-all text-xs font-bold uppercase tracking-[0.2em] group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
                Volver
              </button>
            )}
            <h3 className="text-xl font-bold text-white tracking-tight">
              {view === "selection"
                ? project.title
                : `${project.title} Preview`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all text-white"
          >
            ✕
          </button>
        </div>

        {/* Área de Contenido con Scroll Personalizado */}
        <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-transparent to-bg-dark/20">
          {/* 1. MENÚ DE SELECCIÓN */}
          {view === "selection" && (
            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-500">
              <span className="text-primary/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                Seleccionar Vista
              </span>
              <h4 className="text-white text-2xl md:text-3xl font-black mb-10 text-center">
                Explora la experiencia
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                <button
                  onClick={() => setView("desktop")}
                  className="group relative flex flex-col items-center gap-6 p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-500"
                >
                  <div className="p-6 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                    <FiMonitor className="w-12 h-12 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-bold text-white uppercase tracking-widest text-xs">
                    Desktop Version
                  </span>
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/10 rounded-[2rem] transition-all" />
                </button>

                <button
                  onClick={() => setView("mobile")}
                  className="group relative flex flex-col items-center gap-6 p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-500"
                >
                  <div className="p-6 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                    <FiSmartphone className="w-12 h-12 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-bold text-white uppercase tracking-widest text-xs">
                    Mobile Version
                  </span>
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/10 rounded-[2rem] transition-all" />
                </button>
              </div>
            </div>
          )}

          {/* 2. PREVIEW LAPTOP */}
          {view === "desktop" && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
              <div className="relative w-full max-w-[850px] group">
                <div className="relative aspect-[16/10] bg-[#0c0c0c] rounded-t-3xl border-[12px] border-[#222] overflow-hidden shadow-2xl ring-1 ring-white/10">
                  {project.imgLaptop ? (
                    <Image
                      src={project.imgLaptop}
                      alt="Laptop preview"
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <PlaceholderContent mode="Desktop" />
                  )}
                </div>
                {/* Base de la laptop */}
                <div className="h-6 w-full bg-[#1a1a1a] rounded-b-3xl relative border-t border-white/5 shadow-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#333] rounded-b-full" />
                </div>
              </div>
            </div>
          )}

          {/* 3. PREVIEW MOBILE */}
          {view === "mobile" && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
              <div className="relative w-[300px]">
                <div className="relative h-[600px] w-full bg-[#0c0c0c] rounded-[3.5rem] border-[14px] border-[#222] overflow-hidden shadow-2xl ring-1 ring-white/10">
                  {/* Notch / Dynamic Island simulado */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#222] z-20 rounded-b-[2rem] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#0a0a0a] border border-white/5" />
                  </div>

                  {project.imgMobile ? (
                    <Image
                      src={project.imgMobile}
                      alt="Mobile preview"
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <PlaceholderContent mode="Mobile" />
                  )}
                </div>
                {/* Botones laterales simulados */}
                <div className="absolute -left-4 top-24 w-1 h-12 bg-[#222] rounded-l-md" />
                <div className="absolute -right-4 top-32 w-1 h-20 bg-[#222] rounded-r-md" />
              </div>
            </div>
          )}

          {/* Footer del Modal (Botón de Acción) */}
          {view !== "selection" && (
            <div className="mt-12 text-center max-w-2xl mx-auto pb-8 animate-in fade-in slide-in-from-top-2 duration-700 delay-200">
              <p className="text-text-secondary text-sm md:text-base mb-10 leading-relaxed italic opacity-80">
                &quot;{project.description}&quot;
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(57,255,20,0.2)] hover:shadow-primary/40 uppercase text-xs tracking-[0.2em]"
              >
                Visitar Proyecto Real <FiExternalLink className="text-lg" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
