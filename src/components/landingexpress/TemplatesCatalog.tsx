"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiLayout, FiSmartphone, FiCheckCircle } from "react-icons/fi";
import { templatesData, Template } from "@/data/templatesData";
import TemplatePreviewModal from "./TemplatePreviewModal";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TemplatesCatalog() {
  const whatsappNumber = "5493813583226";

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  return (
    <section className="py-24 relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <span className="section-badge inline-flex items-center gap-2">
          <FiLayout className="w-3.5 h-3.5" />
          Estructuras que venden
        </span>

        <h2 className="title-main text-3xl md:text-5xl mb-4">
          Elegí la estructura que va a empezar a generarte{" "}
          <span className="text-primary">clientes en 48 hs</span>
        </h2>

        <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
          Páginas diseñadas para convertir visitas en consultas reales. Elegís,
          adaptamos tu marca y salís a vender en 48 hs.
        </p>
      </div>

      <div className="relative group/swiper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          // Cambiado 'loop' por 'rewind' para evitar advertencias cuando hay pocos elementos
          rewind={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {templatesData.map((tpl) => (
            <SwiperSlide key={tpl.id}>
              <div className="group bg-surface-dark/40 border border-border-dark rounded-2xl overflow-hidden flex flex-col h-full hover:border-primary/50 transition">
                {/* CLICKABLE PREVIEW */}
                <div
                  onClick={() => setSelectedTemplate(tpl)}
                  className="cursor-pointer"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-bg-darker">
                    <div className="absolute top-3 right-3 z-20 bg-primary/20 border border-primary/30 text-primary text-[10px] px-2 py-1 rounded-full">
                      {tpl.tag}
                    </div>

                    <Image
                      src={tpl.image}
                      alt={tpl.title}
                      fill
                      //  Agregado para optimizar la carga de imágenes según el breakpoint del carrusel
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={tpl.id === 1} // Opcional: da prioridad de carga a la primera tarjeta
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        Ver Preview →
                      </span>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-primary">
                      {tpl.title}
                    </h3>

                    <p className="text-text-secondary text-sm mb-6">
                      {tpl.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tpl.features.map((feat, i) => (
                        <span
                          key={i}
                          className="text-xs bg-bg-dark border border-border-dark px-2 py-1 rounded flex items-center gap-1"
                        >
                          <FiCheckCircle className="text-primary" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BOTONES */}
                  <div className="flex flex-col gap-3">
                    {tpl.demoUrl && (
                      <a
                        href={tpl.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full border border-border-dark py-3 rounded-xl text-white text-center hover:border-primary flex items-center justify-center gap-2"
                      >
                        Ver demo
                        <span className="translate-x-0 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </a>
                    )}

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hola!%20Quiero%20la%20${tpl.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-primary text-bg-dark font-bold py-3 rounded-xl text-center"
                    >
                      Elegir esta plantilla
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAV */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2">
          ←
        </button>
        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2">
          →
        </button>
      </div>

      {/* MODAL */}
      <TemplatePreviewModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />

      <div className="mt-12 text-center text-sm text-text-secondary">
        <FiSmartphone className="inline text-primary mr-2" />
        Adaptadas 100% a celular.
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #4b5563 !important;
        }
        .swiper-pagination-bullet-active {
          background: #2ecc71 !important;
          width: 20px;
        }
      `}</style>
    </section>
  );
}
