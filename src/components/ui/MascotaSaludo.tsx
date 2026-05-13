"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const framePath = "/images/mascota/saludo";

interface Props {
  active?: boolean;
}

const MascotaSaludo: React.FC<Props> = ({ active = false }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const mascotRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Creamos la línea de tiempo usando porcentajes y escalas para ser 100% responsive
    tl.current = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: "back.out(1.5)" },
      onUpdate: () => {
        const progress = tl.current?.progress() || 0;
        // Cambia al frame 2 cuando la animación va por la mitad
        setCurrentFrame(progress < 0.4 ? 1 : 2);
      },
    });

    if (mascotRef.current) {
      tl.current.fromTo(
        mascotRef.current,
        {
          yPercent: 100, // 100% hacia abajo (escondido)
          xPercent: 30, // Sale desde la derecha (30% de su propio tamaño)
          rotate: 20, // Un poco inclinado
          scale: 0.7, // Empieza más chico
          opacity: 0,
        },
        {
          yPercent: 0, // Sube a su posición original
          xPercent: 0, // Vuelve a su centro
          rotate: 0, // Se endereza
          scale: 1, // Tamaño real (el que le da el padre)
          opacity: 1,
        },
      );
    }

    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (active) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [active]);

  return (
    // El contenedor ahora es relativo y delega el tamaño al padre (w-full h-full)
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden pointer-events-none">
      <div
        ref={mascotRef}
        // origin-bottom asegura que la animación escale desde la base y no desde el centro
        className="relative w-full h-full origin-bottom transform-gpu"
      >
        <Image
          src={`${framePath}${currentFrame}.webp`}
          alt="Camaleón Estudio Camaleón"
          fill // fill reemplaza width/height fijos, volviéndolo fluido
          className="object-contain object-bottom"
          priority
          sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
        />
      </div>
    </div>
  );
};

export default MascotaSaludo;
