"use client";

import React from "react";
// Importamos tu componente de Aurora
import Aurora from "@/components/ui/Aurora";

interface ProjectBackgroundProps {
  type: "aurora" | "none";
  color?: string;
}

export default function ProjectBackground({
  type,
  color = "#10B981",
}: ProjectBackgroundProps) {
  if (type === "none") return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Fondo de Aurora de React Bits */}
      {type === "aurora" && (
        <div className="absolute inset-0 w-full h-full mix-blend-screen opacity-80">
          <Aurora
            colorStops={[color, color]} // Usamos el formato que pide React Bits
            amplitude={1.4}
            blend={1}
          />
        </div>
      )}

      {/* Overlay oscuro para no perder legibilidad del texto */}
      <div className="absolute inset-0 bg-bg-dark/50" />
    </div>
  );
}
