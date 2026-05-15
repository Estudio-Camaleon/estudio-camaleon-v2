"use client";

import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { sendEmail } from "@/app/actions/send-email";
import { testimoniesData } from "@/data/testimonies"; // Importación corregida

const Testimony = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("stars", rating.toString());
    formData.append("projectType", "RESEÑA PÚBLICA");

    try {
      const res = await sendEmail(formData);
      if (res.success) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonios"
      className="relative py-24 bg-bg-dark overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[100vw] relative z-10">
        <div className="text-center mb-5 px-6">
          <span className="section-badge inline-block mb-4">Testimonios</span>
        </div>

        {/* Infinite Marquee Carrusel - MAPEO AQUÍ */}
        <div className="flex overflow-hidden gap-6 select-none group py-10">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap gap-6 min-w-full"
          >
            {/* Duplicamos el array para el efecto infinito visual */}
            {[...testimoniesData, ...testimoniesData].map((t, index) => (
              <div
                key={`${t.name}-${index}`}
                className="w-[300px] md:w-[450px] flex-shrink-0 p-8 rounded-3xl bg-surface-dark/40 border border-border-dark hover:border-primary/40 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(t.stars)].map((_, i) => (
                      <FaStar key={i} className="text-primary text-xs" />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-primary/20 text-2xl" />
                </div>
                <p className="text-text-secondary leading-relaxed mb-8 text-sm md:text-base italic">
                  &quot;{t.content}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-white font-bold text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Formulario de Reseña */}
        <div className="max-w-4xl mx-auto px-6 mt-20">
          <div className="bg-bg-darker border border-border-dark rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <FaQuoteLeft className="text-9xl text-primary" />
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmitReview} className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    ¿Nos ayudas con tu opinión?
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Tu feedback nos ayuda a seguir mutando y mejorando.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
                      Tu Nombre
                    </label>
                    <input
                      name="fullName"
                      required
                      className="w-full bg-bg-dark border border-border-dark rounded-2xl p-4 text-white focus:border-primary/50 outline-none transition-all"
                      placeholder="Ej: Alex Camaleón"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
                      Tu Calificación
                    </label>
                    <div className="flex items-center gap-2 h-[58px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="transition-transform active:scale-90"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                        >
                          <FaStar
                            className={`text-2xl transition-colors ${
                              star <= (hover || rating)
                                ? "text-primary"
                                : "text-white/10"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
                    Tu Reseña
                  </label>
                  <textarea
                    name="projectDescription"
                    required
                    rows={3}
                    className="w-full bg-bg-dark border border-border-dark rounded-2xl p-4 text-white focus:border-primary/50 outline-none transition-all resize-none"
                    placeholder="Cuéntanos tu experiencia con el equipo..."
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-light text-bg-dark font-black px-10 py-4 rounded-2xl transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? "ENVIANDO..." : "PUBLICAR RESEÑA"}
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            ) : (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaStar className="text-primary text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ¡Gracias por tu feedback!
                </h3>
                <p className="text-text-secondary">
                  Tu reseña ha sido enviada para moderación y aparecerá pronto.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
