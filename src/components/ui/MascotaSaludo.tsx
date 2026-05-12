"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const framePath = "/images/mascota/saludo";

// --- CONFIGURACIÓN DE TAMAÑOS ---
const SIZES = {
  frame1: { width: 100, height: 80 }, // Un poco más chico mientras está escondido
  frame2: { width: 200, height: 190 }, // Tamaño completo al asomarse
};

interface Props {
  active?: boolean;
}

const MascotaSaludo: React.FC<Props> = ({ active = false }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const mascotRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const currentSize = currentFrame === 1 ? SIZES.frame1 : SIZES.frame2;

  useEffect(() => {
    // Creamos la línea de tiempo para el movimiento físico
    tl.current = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "back.out(1.7)" },
      onUpdate: () => {
        const progress = tl.current?.progress() || 0;
        setCurrentFrame(progress < 0.5 ? 1 : 2);
      },
    });

    if (mascotRef.current) {
      tl.current.fromTo(
        mascotRef.current,
        {
          y: 100, // Sale desde abajo
          x: 50, // Sale desde la derecha
          rotate: 15, // Un poco inclinado
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          rotate: 0,
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
    <div
      className="relative flex items-end justify-end overflow-hidden"
      style={{
        width: `${SIZES.frame2.width}px`,
        height: `${SIZES.frame2.height}px`,
      }}
    >
      <div
        ref={mascotRef}
        className="relative transition-all duration-300 ease-out"
        style={{
          width: `${currentSize.width}px`,
          height: `${currentSize.height}px`,
        }}
      >
        <Image
          src={`${framePath}${currentFrame}.webp`}
          alt="Mascota Estudio Camaleón"
          width={currentSize.width}
          height={currentSize.height}
          className="object-contain w-full h-full"
          priority
        />
      </div>
    </div>
  );
};

export default MascotaSaludo;
