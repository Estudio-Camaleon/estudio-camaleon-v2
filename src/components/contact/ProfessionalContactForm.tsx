"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "@/app/actions/send-email";
import {
  FiCheck,
  FiX,
  FiUploadCloud,
  FiSend,
  FiAlertCircle,
} from "react-icons/fi";

interface ContactFormInputs {
  fullName: string;
  email: string;
  phoneRegion: string;
  phone: string;
  company: string;
  projectType: string;
  estimatedBudget: string;
  deliveryDeadline: string;
  hasCodeBase: string;
  hasDomain: string;
  projectDescription: string;
  howDidYouKnowUs: string;
  honeypot: string;
}

const ProfessionalContactForm = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILES = 5;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneRegion: "+54 (AR)",
      phone: "",
      company: "",
      projectType: "",
      estimatedBudget: "",
      deliveryDeadline: "",
      hasCodeBase: "",
      hasDomain: "",
      projectDescription: "",
      howDidYouKnowUs: "",
      honeypot: "",
    },
  });

  const projectDescriptionValue = watch("projectDescription") || "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const newFiles = Array.from(e.currentTarget.files);

      if (uploadedFiles.length + newFiles.length > MAX_FILES) {
        setErrorMessage(`Máximo ${MAX_FILES} archivos permitidos.`);
        setStatus("error");
        return;
      }

      const tooBig = newFiles.some((file) => file.size > MAX_FILE_SIZE);
      if (tooBig) {
        setErrorMessage("Uno o más archivos superan el límite de 5MB.");
        setStatus("error");
        return;
      }

      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setErrorMessage(null);
      setStatus("idle");
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmitForm = async (data: ContactFormInputs) => {
    if (data.honeypot !== "") return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const submitData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "honeypot") {
          submitData.append(key, value as string);
        }
      });

      uploadedFiles.forEach((file) => {
        submitData.append("files", file);
      });

      const response = await sendEmail(submitData);

      if (response.success) {
        setStatus("success");
        setUploadedFiles([]);
        reset();
      } else {
        throw new Error(response.error || "Error al procesar la solicitud.");
      }
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al enviar.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Honeypot Invisible Antispam */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("honeypot")}
      />

      {/* Grid 1: Datos de contacto primarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Nombre Completo *
          </label>
          <input
            type="text"
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white placeholder-text-secondary/20 outline-none transition-all text-sm ${
              errors.fullName
                ? "border-red-500 focus:border-red-500"
                : "border-border-dark focus:border-primary/50"
            }`}
            placeholder="Ej: Alex Camaleón"
            {...register("fullName", { required: "El nombre es obligatorio" })}
          />
          {errors.fullName && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Email Corporativo *
          </label>
          <input
            type="email"
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white placeholder-text-secondary/20 outline-none transition-all text-sm ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-border-dark focus:border-primary/50"
            }`}
            placeholder="hola@tuempresa.com"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {/* Grid 2: Teléfono y Empresa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            WhatsApp / Teléfono *
          </label>
          <div className="flex gap-2">
            <select
              className="bg-bg-dark/40 border border-border-dark rounded-xl px-2 text-xs text-white focus:border-primary/50 outline-none cursor-pointer"
              {...register("phoneRegion")}
            >
              <option value="+54 (AR)">AR</option>
              <option value="+34 (ES)">ES</option>
              <option value="+52 (MX)">MX</option>
              <option value="+1 (US)">US</option>
            </select>
            <input
              type="tel"
              className={`flex-1 bg-bg-dark/40 border rounded-xl p-3.5 text-white placeholder-text-secondary/20 outline-none text-sm ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-border-dark focus:border-primary/50"
              }`}
              placeholder="11 2233 4455"
              {...register("phone", {
                required: "El teléfono es requerido",
                setValueAs: (v) => v.replace(/\D/g, ""),
              })}
            />
          </div>
          {errors.phone && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Compañía / Marca
          </label>
          <input
            type="text"
            className="w-full bg-bg-dark/40 border border-border-dark rounded-xl p-3.5 text-white placeholder-text-secondary/20 focus:border-primary/50 outline-none transition-all text-sm"
            placeholder="Ej: Camaleón Inc."
            {...register("company")}
          />
        </div>
      </div>

      {/* Grid 3: Tipo de Proyecto y Presupuesto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Tipo de Proyecto *
          </label>
          <select
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white focus:border-primary/50 outline-none text-sm cursor-pointer ${
              errors.projectType ? "border-red-500" : "border-border-dark"
            }`}
            {...register("projectType", { required: "Selecciona una opción" })}
          >
            <option value="">Seleccionar...</option>
            <option value="landing_express">
              Landing Page Express (Económica/Rápida)
            </option>
            <option value="web_high_end">Web High-End Personalizada</option>
            <option value="ecommerce">E-commerce / Tienda Online</option>
            <option value="saas">SaaS / Plataforma Digital</option>
            <option value="mobile">App Mobile (iOS / Android)</option>
          </select>
          {errors.projectType && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.projectType.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Presupuesto Estimado *
          </label>
          <select
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white focus:border-primary/50 outline-none text-sm cursor-pointer ${
              errors.estimatedBudget ? "border-red-500" : "border-border-dark"
            }`}
            {...register("estimatedBudget", {
              required: "Selecciona un rango de presupuesto",
            })}
          >
            <option value="">Seleccionar rango...</option>
            <option value="rango_bajo">Menos de $1,000 USD</option>
            <option value="rango_medio">$1,000 - $2,500 USD</option>
            <option value="rango_alto">$2,500 - $5,000 USD</option>
            <option value="rango_premium">$5,000 USD o más</option>
          </select>
          {errors.estimatedBudget && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.estimatedBudget.message}
            </span>
          )}
        </div>
      </div>

      {/* Grid 4: Plazo de entrega y Estado del código */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Plazo de Entrega Deseado *
          </label>
          <select
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white focus:border-primary/50 outline-none text-sm cursor-pointer ${
              errors.deliveryDeadline ? "border-red-500" : "border-border-dark"
            }`}
            {...register("deliveryDeadline", {
              required: "Selecciona un plazo estimado",
            })}
          >
            <option value="">Seleccionar plazo...</option>
            <option value="urgente">Urgente (Menos de 3 semanas)</option>
            <option value="mes_aprox">Aproximadamente 1 mes</option>
            <option value="estandar">De 1 a 3 meses (Recomendado)</option>
            <option value="flexible">Flexible / Sin prisa</option>
          </select>
          {errors.deliveryDeadline && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.deliveryDeadline.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            ¿Ya tienes algo desarrollado? *
          </label>
          <select
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white focus:border-primary/50 outline-none text-sm cursor-pointer ${
              errors.hasCodeBase ? "border-red-500" : "border-border-dark"
            }`}
            {...register("hasCodeBase", {
              required: "Por favor responde esta consulta",
            })}
          >
            <option value="">Seleccionar estado...</option>
            <option value="desde_cero">No, necesitamos arrancar de cero</option>
            <option value="solo_diseno">
              Sí, tenemos el diseño (Figma / Adobe XD)
            </option>
            <option value="codigo_existente">
              Sí, tenemos una base de código / MVP funcional
            </option>
          </select>
          {errors.hasCodeBase && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.hasCodeBase.message}
            </span>
          )}
        </div>
      </div>

      {/* Grid 5: Dominio y Origen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            ¿Ya tienes un dominio? *
          </label>
          <select
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white focus:border-primary/50 outline-none text-sm cursor-pointer ${
              errors.hasDomain ? "border-red-500" : "border-border-dark"
            }`}
            {...register("hasDomain", {
              required: "Indica el estado de tu dominio",
            })}
          >
            <option value="">Seleccionar...</option>
            <option value="si_registrado">
              Sí, ya lo tengo comprado y registrado
            </option>
            <option value="no_necesito">
              No, necesito asesoramiento / gestión
            </option>
          </select>
          {errors.hasDomain && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.hasDomain.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            ¿Cómo nos conociste? *
          </label>
          <select
            className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white focus:border-primary/50 outline-none text-sm cursor-pointer ${
              errors.howDidYouKnowUs ? "border-red-500" : "border-border-dark"
            }`}
            {...register("howDidYouKnowUs", {
              required: "Selecciona una opción",
            })}
          >
            <option value="">Seleccionar...</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="google">Búsqueda en Google</option>
            <option value="recomendacion">Recomendación / Boca en boca</option>
            <option value="otro">Otro medio</option>
          </select>
          {errors.howDidYouKnowUs && (
            <span className="text-xs text-red-400 block ml-1 font-medium">
              {errors.howDidYouKnowUs.message}
            </span>
          )}
        </div>
      </div>

      {/* Descripción / Visión */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
          Cuéntanos tu visión *
        </label>
        <textarea
          rows={4}
          maxLength={1000}
          className={`w-full bg-bg-dark/40 border rounded-xl p-3.5 text-white placeholder-text-secondary/20 focus:border-primary/50 outline-none transition-all text-sm resize-none ${
            errors.projectDescription ? "border-red-500" : "border-border-dark"
          }`}
          placeholder="Describe los objetivos clave de tu negocio y las funcionalidades que imaginas..."
          {...register("projectDescription", {
            required: "La descripción es requerida para evaluar el proyecto",
            minLength: {
              value: 20,
              message: "Cuéntanos un poco más (mínimo 20 caracteres)",
            },
          })}
        />
        <div className="flex justify-between items-center text-[9px] text-text-secondary/50 uppercase tracking-tighter px-1">
          <span className="text-red-400/80 font-medium">
            {errors.projectDescription?.message}
          </span>
          <span>{projectDescriptionValue.length} / 1000 caracteres</span>
        </div>
      </div>

      {/* Carga de Archivos Dropzone */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
          Carga de Archivos / Referencias
        </label>
        <div
          className="relative border-2 border-dashed border-border-dark rounded-2xl p-6 text-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          />
          <FiUploadCloud className="w-6 h-6 text-primary/60 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-[11px] text-text-secondary font-medium">
            Arrastra especificaciones, mockups o clica para examinar
          </p>
          <p className="text-[9px] text-text-secondary/40 mt-1">
            Formatos admitidos: PDF, Office, Imágenes o TXT (Máx 5MB por archivo
            - Hasta 5 elementos)
          </p>
        </div>
      </div>

      {/* Visualizador de Listado de Archivos Adjuntos con Animaciones de Entrada y Salida */}
      <div className="flex flex-wrap gap-2 overflow-hidden">
        <AnimatePresence>
          {uploadedFiles.map((file, i) => (
            <motion.div
              key={`${file.name}-${i}`}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              layout
              className="flex items-center gap-2 bg-surface-dark border border-border-dark px-3 py-1.5 rounded-xl text-[11px] text-white"
            >
              <span className="truncate max-w-[150px] font-medium">
                {file.name}
              </span>
              <span className="text-[9px] text-text-secondary">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="text-red-400 hover:text-red-300 transition-colors ml-1 cursor-pointer"
              >
                <FiX className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bloque de Estados de Envío y Botón CTA con Framer Motion */}
      <div className="space-y-4 pt-2">
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{
            scale: status === "submitting" ? 1 : 1.015,
            filter: "brightness(1.1)",
          }}
          whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full bg-primary text-dark font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer group shadow-lg shadow-primary/5"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full"
              />
              MUTANDO BRIEFING...
            </span>
          ) : (
            <>
              ENVIAR FORMULARIO
              <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </motion.button>

        {/* Alertas dinámicas con AnimatePresence */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center gap-2 text-primary font-bold text-xs bg-primary/5 py-3 rounded-xl border border-primary/20"
            >
              <FiCheck className="shrink-0 text-sm animate-pulse" />
              ¡BRIEFING RECIBIDO CON ÉXITO! ANALIZAREMOS TU PROPUESTA EN BREVE.
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center gap-2 text-red-400 font-bold text-xs bg-red-400/5 py-3 rounded-xl border border-red-400/20"
            >
              <FiAlertCircle className="shrink-0 text-sm" />
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default ProfessionalContactForm;
