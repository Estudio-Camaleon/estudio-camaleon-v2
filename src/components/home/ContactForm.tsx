"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulación de envío
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
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
              rows={4}
              required
              className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white focus:border-primary outline-none transition-all resize-none"
              placeholder="¿Qué tienes en mente?"
            />
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="cta-button w-full md:w-auto"
          >
            {status === "idle" ? "Enviar Proyecto" : "Enviando..."}
          </button>

          {status === "success" && (
            <p className="mt-4 text-primary text-center font-bold">
              ¡Mensaje enviado con éxito! Te contactaremos pronto.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
