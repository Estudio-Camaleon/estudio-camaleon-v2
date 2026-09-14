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
    tl.current = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: "back.out(1.5)" },
      onUpdate: () => {
        const progress = tl.current?.progress() || 0;
        setCurrentFrame(progress < 0.4 ? 1 : 2);
      },
    });

    if (mascotRef.current) {
      tl.current.fromTo(
        mascotRef.current,
        {
          yPercent: 100,
          xPercent: 30,
          rotate: 20,
          scale: 0.7,
          opacity: 0,
        },
        {
          yPercent: 0,
          xPercent: 0,
          rotate: 0,
          scale: 1,
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
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden pointer-events-none">
      <div
        ref={mascotRef}
        className="relative w-full h-full origin-bottom transform-gpu"
      >
        <Image
          src={`${framePath}${currentFrame}.webp`}
          alt="Camaleón Estudio Camaleón"
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MascotaSaludo;
