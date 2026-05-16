"use client";

import React, { useState, useRef } from "react";
import { sendEmail } from "@/app/actions/send-email";
import {
  FiCheck,
  FiX,
  FiUploadCloud,
  FiSend,
  FiAlertCircle,
} from "react-icons/fi";

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
  honeypot: string; // Campo antispam
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
    honeypot: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILES = 5;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "phone") {
      const onlyNums = value.replace(/\D/g, "");
      if (onlyNums.length <= 15)
        setFormData((prev) => ({ ...prev, [name]: onlyNums }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const newFiles = Array.from(e.currentTarget.files);

      // Validación de cantidad
      if (formData.files.length + newFiles.length > MAX_FILES) {
        setErrorMessage(`Máximo ${MAX_FILES} archivos permitidos.`);
        setStatus("error");
        return;
      }

      // Validación de tamaño
      const tooBig = newFiles.some((file) => file.size > MAX_FILE_SIZE);
      if (tooBig) {
        setErrorMessage("Uno o más archivos superan los 5MB.");
        setStatus("error");
        return;
      }

      setFormData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));
      setErrorMessage(null);
      setStatus("idle");
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Antispam Honeypot
    if (formData.honeypot !== "") return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "files") {
          formData.files.forEach((file) => submitData.append("files", file));
        } else if (key !== "honeypot") {
          submitData.append(key, value as string);
        }
      });

      const response = await sendEmail(submitData);

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
          honeypot: "",
        });
      } else {
        throw new Error(response.error || "Error al enviar");
      }
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Ocurrió un error inesperado.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot (Invisible) */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleInputChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Datos de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Nombre Completo *
          </label>
          <input
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full bg-bg-dark/40 border border-border-dark rounded-xl p-3.5 text-white placeholder-text-secondary/20 focus:border-primary/50 outline-none transition-all text-sm"
            placeholder="Ej: Alex Camaleón"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-bg-dark/40 border border-border-dark rounded-xl p-3.5 text-white placeholder-text-secondary/20 focus:border-primary/50 outline-none transition-all text-sm"
            placeholder="hola@tuempresa.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            WhatsApp
          </label>
          <div className="flex gap-2">
            <select
              name="phoneRegion"
              value={formData.phoneRegion}
              onChange={handleInputChange}
              className="bg-bg-dark/40 border border-border-dark rounded-xl px-2 text-xs text-white focus:border-primary/50 outline-none"
            >
              <option value="+54 (AR)">AR</option>
              <option value="+34 (ES)">ES</option>
              <option value="+52 (MX)">MX</option>
              <option value="+1 (US)">US</option>
            </select>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="flex-1 bg-bg-dark/40 border border-border-dark rounded-xl p-3.5 text-white placeholder-text-secondary/20 focus:border-primary/50 outline-none text-sm"
              placeholder="11 2233 4455"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
            Tipo de Proyecto *
          </label>
          <select
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full bg-bg-dark/40 border border-border-dark rounded-xl p-3.5 text-white focus:border-primary/50 outline-none text-sm"
          >
            <option value="">Seleccionar...</option>
            <option value="web">Web High-End</option>
            <option value="mobile">App Mobile</option>
            <option value="ecommerce">E-commerce</option>
            <option value="saas">SaaS / Plataforma</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">
          Cuéntanos tu visión *
        </label>
        <textarea
          name="projectDescription"
          required
          value={formData.projectDescription}
          onChange={handleInputChange}
          rows={4}
          maxLength={1000}
          className="w-full bg-bg-dark/40 border border-border-dark rounded-xl p-3.5 text-white placeholder-text-secondary/20 focus:border-primary/50 outline-none transition-all text-sm resize-none"
          placeholder="Describe los objetivos y funcionalidades clave..."
        />
        <div className="text-[9px] text-text-secondary/50 text-right uppercase tracking-tighter">
          {formData.projectDescription.length} / 1000 caracteres
        </div>
      </div>

      {/* Files Dropzone */}
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
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />
        <FiUploadCloud className="w-6 h-6 text-primary/60 mx-auto mb-2 group-hover:scale-110 transition-transform" />
        <p className="text-[11px] text-text-secondary font-medium">
          Arrastra referencias o clica para subir
        </p>
        <p className="text-[9px] text-text-secondary/40 mt-1">
          PDF, PNG, JPG (Máx 5MB)
        </p>
      </div>

      {/* File Badges */}
      {formData.files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {formData.files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-surface-dark border border-border-dark px-3 py-1 rounded-full text-[10px] text-white animate-fade-in"
            >
              <span className="truncate max-w-[100px]">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="text-red-400 hover:text-red-300"
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Section */}
      <div className="space-y-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-primary hover:bg-primary-light text-bg-dark font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin" />
              ENVIANDO...
            </span>
          ) : (
            <>
              ENVIAR PROPUESTA
              <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>

        {status === "success" && (
          <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs animate-fade-in bg-primary/5 py-3 rounded-lg border border-primary/20">
            <FiCheck /> ¡PROYECTO RECIBIDO! RESPONDEMOS EN BREVE.
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center justify-center gap-2 text-red-400 font-bold text-xs animate-fade-in bg-red-400/5 py-3 rounded-lg border border-red-400/20">
            <FiAlertCircle /> {errorMessage}
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfessionalContactForm;
