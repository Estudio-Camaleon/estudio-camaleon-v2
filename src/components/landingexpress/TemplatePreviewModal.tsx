"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FiX, FiMessageSquare, FiExternalLink } from "react-icons/fi";
import { Template } from "@/data/templatesData";

export default function TemplatePreviewModal({
  template,
  onClose,
}: {
  template: Template | null;
  onClose: () => void;
}) {
  // Bloqueo de scroll
  useEffect(() => {
    if (template) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [template]);

  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
      {/* Click afuera cierra */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-surface-dark w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/70 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-black transition"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* IMAGEN (ahora protagonista) */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px] overflow-hidden">
          {/* Hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/60 text-white text-xs px-3 py-1 rounded-full animate-pulse">
            Deslizá ↓
          </div>

          {/* Scroll container */}
          <div className="h-full overflow-y-auto scrollbar-none">
            <div className="relative w-full h-[900px]">
              <Image
                src={template.image}
                alt={template.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover object-top"
                priority={true} // Opcional: al ser un modal que el usuario abre con intención, ayuda a cargar la imagen más rápido
              />
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="p-6 md:p-8 flex flex-col justify-between md:w-1/2">
          <div>
            <span className="text-primary text-xs uppercase">
              {template.tag}
            </span>

            <h3 className="text-xl md:text-2xl font-bold text-white mt-2 mb-4">
              {template.title}
            </h3>

            <p className="text-sm text-text-secondary mb-6">
              {template.description}
            </p>

            <ul className="space-y-2 mb-6">
              {template.features.map((f, i) => (
                <li key={i} className="text-sm text-text-secondary">
                  • {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/5493813583226?text=Hola!%20Quiero%20la%20${template.title}`}
              target="_blank"
              className="bg-primary text-black font-bold py-3 rounded-xl text-center"
            >
              <FiMessageSquare className="inline mr-2" />
              Quiero esta plantilla
            </a>

            {template.demoUrl && (
              <a
                href={template.demoUrl}
                target="_blank"
                className="border border-border-dark py-3 rounded-xl text-center text-white"
              >
                <FiExternalLink className="inline mr-2" />
                Ver demo real
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
