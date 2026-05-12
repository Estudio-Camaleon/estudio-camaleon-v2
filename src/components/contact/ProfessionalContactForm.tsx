"use client";

import React, { useState, useRef } from "react";
import { sendEmail } from "@/app/actions/send-email";
import { FiCheck, FiX, FiUploadCloud } from "react-icons/fi";

interface FormData {
  fullName: string;
  email: string;
  phoneRegion: string;
  phone: string;
  company: string;
  projectType: string;
  hasCodeBase: string;
  projectDescription: string;
  howDidYouKnowUs: string;
  files: File[];
}

const ProfessionalContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneRegion: "+54 (AR)",
    phone: "",
    company: "",
    projectType: "",
    hasCodeBase: "",
    projectDescription: "",
    howDidYouKnowUs: "",
    files: [],
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    const nextValue = name === "phone" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const newFiles = Array.from(e.currentTarget.files);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary", "bg-primary/5");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("border-primary", "bg-primary/5");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary", "bg-primary/5");
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const submitFormData = new FormData();
      
      // Agregar campos de texto
      submitFormData.append("fullName", formData.fullName);
      submitFormData.append("email", formData.email);
      submitFormData.append("phoneRegion", formData.phoneRegion);
      submitFormData.append("phone", formData.phone);
      submitFormData.append("company", formData.company);
      submitFormData.append("projectType", formData.projectType);
      submitFormData.append("hasCodeBase", formData.hasCodeBase);
      submitFormData.append("projectDescription", formData.projectDescription);
      submitFormData.append("howDidYouKnowUs", formData.howDidYouKnowUs);
      
      // Agregar archivos
      formData.files.forEach((file) => {
        submitFormData.append("files", file);
      });

      const response = await sendEmail(submitFormData);

      if (response.success) {
        setStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phoneRegion: "+54 (AR)",
          phone: "",
          company: "",
          projectType: "",
          hasCodeBase: "",
          projectDescription: "",
          howDidYouKnowUs: "",
          files: [],
        });
      } else {
        setStatus("error");
        setErrorMessage(response.error || "Ocurrió un error enviando el mensaje.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ocurrió un error inesperado."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información de contacto */}
      <div className="bg-surface-dark/50 p-6 md:p-8 rounded-2xl border border-border-dark">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <FiCheck className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white">Información de contacto</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
              Nombre Completo *
            </label>
            <input
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white placeholder-text-secondary/50 focus:border-primary outline-none transition-all"
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white placeholder-text-secondary/50 focus:border-primary outline-none transition-all"
              placeholder="tu@email.com"
            />
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
              Teléfono / WhatsApp
            </label>
            <div className="grid grid-cols-[104px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] gap-2 min-w-0">
              <select
                name="phoneRegion"
                value={formData.phoneRegion}
                onChange={handleInputChange}
                className="w-full min-w-0 bg-bg-dark border border-border-dark rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
              >
                <option value="+54 (AR)">+54 AR</option>
                <option value="+34 (ES)">+34 ES</option>
                <option value="+52 (MX)">+52 MX</option>
                <option value="+57 (CO)">+57 CO</option>
                <option value="+56 (CL)">+56 CL</option>
                <option value="+51 (PE)">+51 PE</option>
                <option value="+1 (US)">+1 US</option>
              </select>

              <input
                name="phone"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full min-w-0 bg-bg-dark border border-border-dark rounded-xl p-4 text-white placeholder-text-secondary/50 focus:border-primary outline-none transition-all"
                placeholder="Solo números"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
              Empresa (Opcional)
            </label>
            <input
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full min-w-0 bg-bg-dark border border-border-dark rounded-xl p-4 text-white placeholder-text-secondary/50 focus:border-primary outline-none transition-all"
              placeholder="Nombre de tu empresa"
            />
          </div>
        </div>
      </div>

      {/* Sobre tu proyecto */}
      <div className="bg-surface-dark/50 p-6 md:p-8 rounded-2xl border border-border-dark">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <FiCheck className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white">Sobre tu proyecto</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
              Tipo de Proyecto *
            </label>
            <select
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleInputChange}
              className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
            >
              <option value="">Selecciona una opción</option>
              <option value="web">Desarrollo Web</option>
              <option value="mobile">Aplicación Mobile</option>
              <option value="ecommerce">E-commerce</option>
              <option value="fullstack">Full Stack</option>
              <option value="consulting">Consultoría</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
            ¿Ya tienes algo desarrollado?
          </label>
          <div className="flex flex-wrap gap-3">
            {["Si", "No", "Tengo bocetos"].map((option) => (
              <label
                key={option}
                className="cursor-pointer rounded-lg border border-border-dark bg-bg-dark px-4 py-2.5 text-sm text-text-secondary transition-all hover:border-primary/60"
              >
                <input
                  type="radio"
                  name="hasCodeBase"
                  value={option}
                  checked={formData.hasCodeBase === option}
                  onChange={(e) =>
                    handleRadioChange("hasCodeBase", e.currentTarget.value)
                  }
                  className="mr-2 w-4 h-4 accent-primary align-middle"
                />
                <span className="align-middle">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
            Cuéntanos sobre tu proyecto *
          </label>
          <textarea
            name="projectDescription"
            required
            value={formData.projectDescription}
            onChange={handleInputChange}
            rows={5}
            maxLength={500}
            className="bg-bg-dark border border-border-dark rounded-xl p-4 text-white placeholder-text-secondary/50 focus:border-primary outline-none transition-all resize-none"
            placeholder="Describe tu proyecto, objetivos, funcionalidades principales, ideas, referencias, lo que consideres importante..."
          />
          <p className="text-xs text-text-secondary text-right">
            {formData.projectDescription.length}/500
          </p>
        </div>
      </div>

      {/* Recursos y archivos */}
      <div className="bg-surface-dark/50 p-6 md:p-8 rounded-2xl border border-border-dark">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <FiCheck className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white">Recursos y archivos</h3>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed border-border-dark rounded-xl p-8 text-center transition-all cursor-pointer hover:border-primary/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <FiUploadCloud className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary font-semibold mb-2">
            Arrastra archivos aquí o haz clic para seleccionar
          </p>
          <p className="text-xs text-text-secondary/60">
            PDF, imágenes, documentos, bocetos, referencias, etc. 4MB por archivo
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {formData.files.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-text-secondary mb-3">
              Ejemplos de lo que puedes enviar:
            </p>
            <ul className="text-sm text-text-secondary/70 space-y-1 mb-4">
              <li>✓ Recetas o wireframes</li>
              <li>✓ Diferencias de sitios que te gusten</li>
              <li>✓ Documentos con requerimientos</li>
              <li>✓ Cualquier material relevante</li>
            </ul>

            <div className="space-y-2">
              {formData.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-bg-dark p-3 rounded-lg border border-border-dark"
                >
                  <span className="text-sm text-white truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cómo nos conociste */}
      <div className="bg-surface-dark/50 p-6 md:p-8 rounded-2xl border border-border-dark">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <FiCheck className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white">¿Cómo nos conociste?</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { value: "google", label: "Google" },
            { value: "redes-sociales", label: "Redes sociales" },
            { value: "recomendacion", label: "Recomendación" },
            { value: "portafolio", label: "Portafolio" },
            { value: "otro", label: "Otro" },
          ].map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-lg border border-border-dark bg-bg-dark px-4 py-2.5 text-sm text-text-secondary transition-all hover:border-primary/60"
            >
              <input
                type="radio"
                name="howDidYouKnowUs"
                value={option.value}
                checked={formData.howDidYouKnowUs === option.value}
                onChange={(e) =>
                  handleRadioChange("howDidYouKnowUs", e.currentTarget.value)
                }
                className="mr-2 w-4 h-4 accent-primary align-middle"
              />
              <span className="align-middle">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Aviso de privacidad */}
      <div className="bg-surface-dark/50 p-6 rounded-2xl border border-border-dark flex items-center gap-4">
        <FiCheck className="text-primary flex-shrink-0 w-5 h-5" />
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-white">Tu información está 100% protegida.</span>
          {" "}No compartimos tus datos con terceros.
        </p>
      </div>

      {/* Botón de envío y estados */}
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="cta-button w-full py-4 text-lg font-semibold"
        >
          {status === "submitting" ? "Enviando proyecto..." : "Enviar Proyecto"}
        </button>

        {status === "success" && (
          <div className="bg-primary/10 border border-primary/50 rounded-xl p-4 text-center">
            <p className="text-primary font-bold">
              ¡Mensaje enviado con éxito! Te contactaremos en menos de 24h.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center">
            <p className="text-red-400 font-bold">
              {errorMessage || "No se pudo enviar el mensaje. Intenta de nuevo."}
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfessionalContactForm;
