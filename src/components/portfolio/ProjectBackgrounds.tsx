"use client";

import React from "react";
import Aurora from "@/components/ui/Aurora";
import { useInView } from "@/hooks/useInView";

interface ProjectBackgroundProps {
  type: "aurora" | "none";
  color?: string;
  paused?: boolean;
}

export default function ProjectBackground({
  type,
  color = "#10B981",
  paused = false,
}: ProjectBackgroundProps) {
  const { ref, isInView } = useInView({ rootMargin: "300px", once: false });

  if (type === "none") return null;

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {type === "aurora" && isInView && (
        <div className="absolute inset-0 w-full h-full mix-blend-screen opacity-80">
          <Aurora
            colorStops={[color, color]}
            amplitude={1.4}
            blend={1}
            paused={paused}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-bg-dark/50" />
    </div>
  );
}
