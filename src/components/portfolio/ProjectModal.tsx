"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Monitor, Smartphone, ArrowLeft, ExternalLink } from "lucide-react";

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

// --- CUSTOM HOOK MEJORADO (Derived State) ---
function useValidUrl(url?: string) {
  if (!url || url.trim() === "" || url === "#") {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

const PlaceholderContent = ({ mode }: { mode: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] gap-6 p-10 text-center">
    <div className="relative w-20 h-20 opacity-30 animate-pulse">
      <Image
        src="/icons/Logowebjunto.svg"
        alt="Estudio Camaleón"
        fill
        className="object-contain"
      />
    </div>
    <div className="space-y-2">
      <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
        Procesando UI
      </p>
      <p className="text-white/40 text-xs max-w-[220px] font-light leading-relaxed">
        Las capturas de la interfaz {mode} están siendo renderizadas para este
        proyecto.
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

  const isLinkValid = useValidUrl(project?.link);

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }).to(
        contentRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.1",
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => {
        setView("selection");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-bg-dark/95 backdrop-blur-xl opacity-0 cursor-pointer"
      />

      <div
        ref={contentRef}
        className="relative w-full max-w-6xl bg-surface-dark border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl opacity-0 scale-95 translate-y-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/40 shrink-0">
          <div className="flex items-center gap-6">
            {view !== "selection" && (
              <button
                onClick={() => setView("selection")}
                className="flex items-center gap-2 text-primary hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest group bg-white/5 px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver
              </button>
            )}
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-black transition-all text-white"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-transparent to-black/40">
          {view === "selection" && (
            <div className="flex flex-col items-center justify-center py-8 md:py-16">
              <span className="text-primary/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                Preview Mode
              </span>
              <h4 className="text-white text-3xl md:text-4xl font-black mb-12 text-center tracking-tighter">
                Selecciona la Vista
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                <button
                  onClick={() => setView("desktop")}
                  className="group relative flex flex-col items-center gap-6 p-12 rounded-[2rem] bg-[#0f0f0f] border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 shadow-xl"
                >
                  <div className="p-6 rounded-3xl bg-white/5 group-hover:bg-primary/20 transition-colors">
                    <Monitor
                      className="w-12 h-12 text-white/50 group-hover:text-primary transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-bold text-white uppercase tracking-[0.2em] text-xs">
                    Desktop Version
                  </span>
                </button>

                <button
                  onClick={() => setView("mobile")}
                  className="group relative flex flex-col items-center gap-6 p-12 rounded-[2rem] bg-[#0f0f0f] border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 shadow-xl"
                >
                  <div className="p-6 rounded-3xl bg-white/5 group-hover:bg-primary/20 transition-colors">
                    <Smartphone
                      className="w-12 h-12 text-white/50 group-hover:text-primary transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-bold text-white uppercase tracking-[0.2em] text-xs">
                    Mobile Version
                  </span>
                </button>
              </div>
            </div>
          )}

          {view === "desktop" && (
            <div className="flex flex-col items-center transition-opacity duration-500">
              <div className="relative w-full max-w-[900px]">
                <div className="relative aspect-[16/10] bg-[#0a0a0a] rounded-t-3xl border-[12px] md:border-[16px] border-[#111] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
                  {project.imgLaptop ? (
                    <Image
                      src={project.imgLaptop}
                      alt="Desktop preview"
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <PlaceholderContent mode="Desktop" />
                  )}
                </div>
                <div className="h-6 md:h-8 w-full bg-[#111] rounded-b-3xl relative border-t border-white/5 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 md:h-2 bg-[#222] rounded-b-full" />
                </div>
              </div>
            </div>
          )}

          {view === "mobile" && (
            <div className="flex flex-col items-center transition-opacity duration-500">
              <div className="relative w-[280px] md:w-[320px]">
                <div className="relative h-[600px] md:h-[680px] w-full bg-[#0a0a0a] rounded-[3rem] border-[14px] border-[#111] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#111] z-20 rounded-b-[1.5rem] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/10" />
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
                <div className="absolute -left-3.5 top-28 w-1 h-14 bg-[#111] rounded-l-md" />
                <div className="absolute -right-3.5 top-36 w-1 h-20 bg-[#111] rounded-r-md" />
              </div>
            </div>
          )}

          {/* RENDERIZADO CONDICIONAL DEL BOTÓN */}
          {view !== "selection" && isLinkValid && (
            <div className="mt-12 text-center max-w-2xl mx-auto pb-6 animate-in fade-in zoom-in duration-500">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(57,255,20,0.2)] uppercase text-[10px] tracking-[0.2em]"
              >
                Visitar Proyecto Real <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
