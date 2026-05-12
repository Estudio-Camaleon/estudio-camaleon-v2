"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    imgLaptop?: string; // Captura en laptop
    imgMobile?: string; // Captura en mobile
    link: string;
  } | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Animación de entrada
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }).to(
        contentRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.1",
      );

      document.body.style.overflow = "hidden"; // Bloquear scroll
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
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-bg-dark/90 backdrop-blur-md opacity-0"
      />

      {/* Contenido del Modal */}
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl bg-surface-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl opacity-0 scale-95 translate-y-10"
      >
        {/* Header del Modal */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-bg-dark/50">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-white"
          >
            ✕
          </button>
        </div>

        {/* Área de Visualización (Devices) */}
        <div className="p-8 lg:p-12 overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Vista Laptop */}
            <div className="relative w-full max-w-[600px] group">
              <p className="text-center text-[10px] uppercase tracking-widest text-text-secondary mb-4">
                Desktop Version
              </p>
              <div className="relative aspect-[16/10] bg-black rounded-t-xl border-4 border-[#333] overflow-hidden shadow-2xl">
                <Image
                  src={project.imgLaptop || project.link} // Fallback a img principal
                  alt="Laptop view"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="h-4 w-full bg-[#222] rounded-b-xl relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#444] rounded-b-full" />
              </div>
            </div>

            {/* Vista Mobile */}
            <div className="relative w-[220px] shrink-0">
              <p className="text-center text-[10px] uppercase tracking-widest text-text-secondary mb-4">
                Mobile Version
              </p>
              <div className="relative h-[450px] w-full bg-black rounded-[2.5rem] border-[6px] border-[#333] overflow-hidden shadow-2xl shadow-primary/10">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#333] z-20 rounded-b-2xl" />
                <Image
                  src={project.imgMobile || project.link}
                  alt="Mobile view"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-text-secondary mb-6">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              className="cta-button inline-flex items-center gap-2"
            >
              Visitar Sitio Web Real <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
