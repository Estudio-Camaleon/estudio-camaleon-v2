"use client";

import React, { useState } from "react";
import { sendEmail } from "@/app/actions/send-email";

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await sendEmail(formData);

      if (response.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          response.error || "Ocurrió un error enviando el mensaje.",
        );
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado.",
      );
    }
  };

  return (
    <section id="contacto" className="py-24 bg-bg-darker">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-badge">Contacto</span>
          <h2 className="title-main text-5xl mb-6">Trabajemos juntos</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Cuéntanos los detalles y empecemos a
            darle forma.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-dark p-8 md:p-12 rounded-3xl border border-border-dark shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                Nombre
              </label>
              <input
                name="name"
                type="text"
                required
                className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
                placeholder="Tu nombre"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
              Mensaje
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white focus:border-primary outline-none transition-all resize-none"
              placeholder="¿Qué tienes en mente?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="cta-button w-full md:w-auto"
          >
            {status === "submitting" ? "Enviando..." : "Enviar Proyecto"}
          </button>

          {status === "success" && (
            <p className="mt-4 text-primary text-center font-bold">
              ¡Mensaje enviado con éxito! Te contactaremos pronto.
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 text-red-400 text-center font-bold">
              {errorMessage || "No se pudo enviar el mensaje. Intenta de nuevo."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
