// src/app/landingexpress/page.tsx
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TemplatesCatalog from "@/components/landingexpress/TemplatesCatalog";
import { FiZap, FiCheck, FiX, FiMessageSquare } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Landing Express | Estudio Camaleón",
  description:
    "Tu página web lista en 24-48 horas para recibir consultas directo en tu WhatsApp con diseño premium.",
};

const includes = [
  "1 página web completa",
  "Botón directo a tu WhatsApp",
  "Hasta 5 secciones estructuradas",
  "Diseño a elección (Plantilla 1, 2 o 3)",
  "Adaptada 100% a celulares (Mobile First)",
  "Entrega garantizada en 48 hs",
];

const notIncludes = [
  "Panel de administración (CMS)",
  "E-commerce o pasarelas de pago",
  "Cambios de diseño ilimitados",
  "Estrategia de SEO avanzado",
];

export default function LandingExpressPage() {
  const whatsappNumber = "5493813583226";

  return (
    <main className="bg-bg-dark min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 px-6">
        {/* Glow de fondo para mantener el estilo premium oscuro */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="section-badge inline-flex items-center gap-2 mb-6">
            <FiZap className="w-3.5 h-3.5 animate-pulse" />
            Servicio Express
          </span>
          <h1 className="title-main text-4xl sm:text-5xl md:text-6xl lg:text-5xl mb-8 leading-tight">
            Una página lista en <span className="text-primary">24–48 hs</span>{" "}
            <br />
            para que recibas consultas por{" "}
            <span className="text-primary"> WhatsApp</span>
          </h1>
          <p className="text-text-secondary text-base md:text-xl mb-10 max-w-2xl mx-auto text-pretty font-light">
            Estrategia ágil y estética premium combinadas. La solución ideal
            para lanzar tu producto, servicio o campaña al mercado sin perder
            tiempo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hola!%20Me%20interesa%20el%20paquete%20de%20Landing%20Express`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button w-full sm:w-auto text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(46,204,112,0.2)]"
            >
              <FiMessageSquare className="w-5 h-5" />
              Quiero mi Landing Express
            </a>
          </div>
        </div>
      </section>

      {/* Tabla Comparativa de Alcance e Inclusiones */}
      <section className="py-12 relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Columna: Lo que incluye */}
          <div className="bg-surface-dark/40 backdrop-blur-sm border border-border-dark p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Landing Express incluye:
            </h3>
            <ul className="space-y-4">
              {includes.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-text-secondary text-sm md:text-base"
                >
                  <FiCheck className="text-primary w-5 h-5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna: Lo que NO incluye (Disclaimer comercial crucial) */}
          <div className="bg-surface-dark/20 backdrop-blur-sm border border-border-dark/60 p-8 rounded-2xl relative">
            <h3 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />❌ NO incluye:
            </h3>
            <ul className="space-y-4 mb-8">
              {notIncludes.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-text-secondary/80 text-sm md:text-base"
                >
                  <FiX className="text-red-500/80 w-5 h-5 shrink-0" />
                  <span className="line-through decoration-border-dark">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Pie de la tarjeta: Información de Adicionales */}
            <div className="pt-6 border-t border-border-dark/60 flex items-center justify-between bg-bg-darker/50 -mx-8 -mb-8 p-6 rounded-b-2xl">
              <span className="text-xs md:text-sm text-text-secondary font-medium tracking-wide uppercase">
                👉 Todo eso = adicional
              </span>
              <span className="text-primary font-black text-sm md:text-base tracking-wider animate-pulse">
                $$$
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Plantillas con Swiper e interactividad Modal */}
      <TemplatesCatalog />

      {/* Call to Action Final */}
      <section className="pb-24 relative overflow-hidden text-center px-6">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-3xl mx-auto">
          <h2 className="title-main text-3xl md:text-5xl mb-6">
            ¿Listo para empezar a recibir <br className="hidden sm:block" />
            <span className="text-primary">consultas de clientes?</span>
          </h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto text-sm md:text-base font-light">
            Elegí tu plantilla, pasanos la información de tu negocio y nosotros
            nos encargamos de toda la magia técnica.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hola!%20Quiero%20coordinar%20mi%20Landing%20Express`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Iniciar Mi Proyecto Ahora
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
