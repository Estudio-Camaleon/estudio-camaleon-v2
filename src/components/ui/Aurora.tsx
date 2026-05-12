"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number; // Nueva propiedad para controlar la velocidad de la animación
}

const Aurora = ({
  colorStops = ["#10B981", "#059669"],
  amplitude = 1.4,
  blend = 1,
  speed = 1.0,
}: AuroraProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const container = containerRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización de rendimiento
    container.appendChild(renderer.domElement);

    // Lógica para asegurar que si se pasa el mismo color, haya variación visible
    const baseColor = new THREE.Color(colorStops[0]);
    const secondaryColor =
      colorStops.length > 1 && colorStops[0] !== colorStops[1]
        ? new THREE.Color(colorStops[1])
        : new THREE.Color(colorStops[0]).offsetHSL(0.05, 0.2, 0.15); // Desplaza ligeramente el tono/brillo

    // Geometría y Shaders Premium para el efecto Aurora
    const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uBlend: { value: blend },
        uColor1: { value: baseColor },
        uColor2: { value: secondaryColor },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAmplitude;
        void main() {
          vUv = uv;
          vec3 pos = position;
          // Movimiento de olas más orgánico y fluido
          float noise = sin(pos.x * 2.5 + uTime * 0.4) * cos(pos.y * 2.0 + uTime * 0.3);
          pos.z += noise * 0.25 * uAmplitude;
          gl_Position = vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        uniform float uBlend;

        void main() {
          vec2 uv = vUv;
          
          // Distorsión de las coordenadas UV para efecto de líquido/humo
          uv.x += sin(uv.y * 3.0 + uTime * 0.3) * 0.1;
          uv.y += cos(uv.x * 3.0 + uTime * 0.2) * 0.1;

          // Creación de las "cintas" de luz (Ribbons)
          float ribbon1 = sin(uv.x * 8.0 + uTime * 0.8) * 0.5 + 0.5;
          float ribbon2 = cos(uv.y * 6.0 - uTime * 1.1) * 0.5 + 0.5;

          // Máscara de mezcla dinámica
          float mask = smoothstep(0.2, 0.8, ribbon1 * ribbon2 * uBlend);

          // Color base dinámico
          vec3 color = mix(uColor1, uColor2, mask + sin(uTime * 0.2) * 0.1);

          // Añadir brillo intenso en los picos de las ondas (Glow)
          float glow = smoothstep(0.75, 1.0, ribbon1) * 0.5;
          color += uColor2 * glow;

          // Desvanecimiento radial (Vignette invertida) para que los bordes sean suaves
          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.5, 0.05, dist);

          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Optimización para renderizado de transparencias
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 1;

    // Loop de animación
    let animationFrameId: number;
    const animate = (time: number) => {
      material.uniforms.uTime.value = time * 0.001 * speed; // Aplicamos el factor de velocidad
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);

    // Fade-in activado al montar todo
    requestAnimationFrame(() => setIsReady(true));

    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup profundo para evitar memory leaks
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose(); // Vital en Next.js
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full transition-opacity duration-1000 ease-out ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default Aurora;
