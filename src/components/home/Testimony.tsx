"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaQuoteLeft,
  FaStar,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import { sendReviewEmail } from "@/app/actions/send-review";
import { testimoniesData } from "@/data/testimonies";

interface ReviewFormInputs {
  fullName: string;
  projectDescription: string;
  stars: number;
}

const Testimony = () => {
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormInputs>({
    defaultValues: {
      fullName: "",
      projectDescription: "",
      stars: 5,
    },
  });

  const currentRating = watch("stars");
  const x = useMotionValue(0);
  const isPaused = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const speed = 2;

    const animate = () => {
      if (!isPaused.current) {
        const el = wrapperRef.current;
        if (el) {
          const halfW = el.scrollWidth / 2;
          if (halfW > 0) {
            const currentX = x.get();
            let newX = currentX - speed;
            if (newX <= -halfW) {
              newX += halfW;
            }
            x.set(newX);
          }
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x]);

  const onSubmitReview = async (data: ReviewFormInputs) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Enpaquetamos únicamente los datos puros de la reseña.
    // 🔒 La seguridad del correo de destino y el asunto se manejan en el servidor.
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("projectDescription", data.projectDescription);
    formData.append("stars", data.stars.toString());

    try {
      const res = await sendReviewEmail(formData);

      if (res?.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          res?.error ||
            "El servidor rechazó el envío. Verifica la configuración de Resend.",
        );
      }
    } catch (err) {
      console.error("Error crítico en la Server Action:", err);
      setSubmitError(
        "No se pudo conectar con el servidor. Revisa tu conexión a internet.",
      );
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

        {/* Infinite Marquee Carrusel */}
        <div className="flex overflow-hidden gap-6 select-none group py-10">
          <motion.div
            ref={wrapperRef}
            style={{ x }}
            drag="x"
            onDragStart={() => {
              isPaused.current = true;
            }}
            onDragEnd={() => {
              isPaused.current = false;
            }}
            className="flex flex-nowrap gap-6 min-w-full cursor-grab active:cursor-grabbing"
          >
            {[...testimoniesData, ...testimoniesData].map((t, index) => (
              <div
                key={`${t.name}-${index}`}
                // Oculta la segunda mitad duplicada de los lectores de pantalla para evitar redundancia
                aria-hidden={index >= testimoniesData.length}
                className="w-[300px] md:w-[450px] flex-shrink-0 p-8 rounded-3xl bg-surface-dark/40 border border-border-dark hover:border-primary/40 transition-all duration-300 backdrop-blur-sm pointer-events-none"
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

        {/* Form Container */}
        <div className="max-w-4xl mx-auto px-6 mt-20">
          <div className="bg-bg-darker border border-border-dark rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden transition-all duration-500 shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <FaQuoteLeft className="text-9xl text-primary" />
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="review-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit(onSubmitReview)}
                  className="relative z-10"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      ¿Nos ayudas con tu opinión?
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Tu feedback nos ayuda a seguir mutando y mejorando.
                    </p>
                  </div>

                  {/* Alerta de error de servidor visible */}
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                      <FaExclamationTriangle className="shrink-0 text-base" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Campo: Tu Nombre */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
                        Tu Nombre
                      </label>
                      <input
                        {...register("fullName", {
                          required: "Por favor, dinos tu nombre",
                          minLength: {
                            value: 3,
                            message:
                              "El nombre debe tener al menos 3 caracteres",
                          },
                        })}
                        className={`w-full bg-bg-dark border rounded-2xl p-4 text-white outline-none transition-all ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-500 bg-red-500/5"
                            : "border-border-dark focus:border-primary/50"
                        }`}
                        placeholder="Ej: Alex Camaleón"
                      />
                      {errors.fullName && (
                        <span className="text-xs text-red-400 block ml-1 font-medium">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>

                    {/* Campo: Tu Calificación */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
                        Tu Calificación
                      </label>
                      <div className="flex items-center gap-2 h-[58px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            aria-label={`Calificar con ${star} estrellas`}
                            className="transition-transform active:scale-90 cursor-pointer"
                            onClick={() =>
                              setValue("stars", star, { shouldValidate: true })
                            }
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                          >
                            <FaStar
                              className={`text-2xl transition-colors ${
                                star <= (hover || currentRating)
                                  ? "text-primary"
                                  : "text-white/10"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Campo: Tu Reseña */}
                  <div className="space-y-2 mb-8">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
                      Tu Reseña
                    </label>
                    <textarea
                      {...register("projectDescription", {
                        required: "Escribe unas palabras sobre tu experiencia",
                        minLength: {
                          value: 10,
                          message:
                            "La descripción debe tener al menos 10 caracteres",
                        },
                      })}
                      rows={3}
                      className={`w-full bg-bg-dark border rounded-2xl p-4 text-white outline-none transition-all resize-none ${
                        errors.projectDescription
                          ? "border-red-500 focus:border-red-500 bg-red-500/5"
                          : "border-border-dark focus:border-primary/50"
                      }`}
                      placeholder="Cuéntanos tu experiencia con el equipo..."
                    />
                    {errors.projectDescription && (
                      <span className="text-xs text-red-400 block ml-1 font-medium">
                        {errors.projectDescription.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-dark text-dark font-black px-10 py-4 rounded-2xl transition-all flex items-center gap-3 disabled:opacity-50 cursor-pointer shadow-lg shadow-primary/10"
                  >
                    {isSubmitting ? "ENVIANDO..." : "PUBLICAR RESEÑA"}
                    <FaPaperPlane className="text-xs" />
                  </button>
                </motion.form>
              ) : (
                /* Aviso de éxito premium */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="text-center py-12 flex flex-col items-center justify-center relative z-10"
                >
                  <div className="absolute w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />

                  <motion.div
                    initial={{ rotate: -15, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/30"
                  >
                    <FaCheckCircle className="text-dark text-5xl" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-black text-white mb-3 tracking-tight"
                  >
                    ¡Feedback procesado con éxito!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-text-secondary max-w-md mx-auto text-base leading-relaxed"
                  >
                    Tu opinión ha sido enviada directamente a nuestro equipo de
                    moderación. ¡Gracias por ayudarnos a mutar!
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
