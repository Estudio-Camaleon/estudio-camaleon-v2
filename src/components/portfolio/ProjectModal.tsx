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
    imgLaptop?: string;
    imgMobile?: string;
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
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-bg-dark/95 backdrop-blur-md opacity-0"
      />

      <div
        ref={contentRef}
        className="relative w-full max-w-6xl bg-surface-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl opacity-0 scale-95 translate-y-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-bg-dark/50 shrink-0">
          <div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-primary text-xs uppercase tracking-tighter">
              Live Preview Mode
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-white"
          >
            ✕
          </button>
        </div>

        {/* Área de Visualización */}
        <div className="p-4 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
            {/* DISPOSITIVO: LAPTOP */}
            <div className="relative w-full max-w-[700px]">
              <div className="relative aspect-[16/10] bg-[#1a1a1a] rounded-t-2xl border-[8px] border-[#333] overflow-hidden shadow-2xl">
                {project.imgLaptop ? (
                  <Image
                    src={project.imgLaptop}
                    alt="Laptop view"
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <iframe
                    src={project.link}
                    className="w-full h-full border-none"
                    title="Desktop Preview"
                  />
                )}
              </div>
              <div className="h-5 w-full bg-[#222] rounded-b-2xl relative border-t border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#444] rounded-b-full" />
              </div>
            </div>

            {/* DISPOSITIVO: MOBILE */}
            <div className="relative w-[260px] shrink-0 hidden md:block">
              <div className="relative h-[520px] w-full bg-[#1a1a1a] rounded-[3rem] border-[10px] border-[#333] overflow-hidden shadow-2xl ring-1 ring-white/10">
                {/* Cámara/Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#333] z-20 rounded-b-3xl flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#111]" />
                </div>

                {project.imgMobile ? (
                  <Image
                    src={project.imgMobile}
                    alt="Mobile view"
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <iframe
                    src={project.link}
                    className="w-full h-full border-none"
                    title="Mobile Preview"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Info Inferior */}
          <div className="mt-12 text-center max-w-2xl mx-auto pb-10">
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-3 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            >
              Explorar Sitio Completo <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
