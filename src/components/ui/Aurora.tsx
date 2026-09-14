"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  paused?: boolean;
}

const Aurora = ({
  colorStops = ["#10B981", "#059669"],
  amplitude = 1.4,
  blend = 1,
  speed = 1.0,
  paused = false,
}: AuroraProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });

    rendererRef.current = renderer;

    const container = containerRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const baseColor = new THREE.Color(colorStops[0]);
    const secondaryColor =
      colorStops.length > 1 && colorStops[0] !== colorStops[1]
        ? new THREE.Color(colorStops[1])
        : new THREE.Color(colorStops[0]).offsetHSL(0.05, 0.2, 0.15);

    const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
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
          
          uv.x += sin(uv.y * 3.0 + uTime * 0.3) * 0.1;
          uv.y += cos(uv.x * 3.0 + uTime * 0.2) * 0.1;

          float ribbon1 = sin(uv.x * 8.0 + uTime * 0.8) * 0.5 + 0.5;
          float ribbon2 = cos(uv.y * 6.0 - uTime * 1.1) * 0.5 + 0.5;

          float mask = smoothstep(0.2, 0.8, ribbon1 * ribbon2 * uBlend);

          vec3 color = mix(uColor1, uColor2, mask + sin(uTime * 0.2) * 0.1);

          float glow = smoothstep(0.75, 1.0, ribbon1) * 0.5;
          color += uColor2 * glow;

          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.5, 0.05, dist);

          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 1;

    let lastTime = 0;
    const animate = (time: number) => {
      if (!pausedRef.current) {
        const delta = time - lastTime;
        material.uniforms.uTime.value += delta * 0.001 * speed;
        renderer.render(scene, camera);
        lastTime = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    requestAnimationFrame(() => setIsReady(true));

    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
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
