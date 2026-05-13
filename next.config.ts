import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
    // @ts-expect-error - Turbopack reconoce esta propiedad pero los tipos de Next a veces fallan
    turbo: {
      root: ".",
    },
  },
  /* Configuración de imágenes para evitar errores de dominios externos si usas iframes/links */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite previsualizaciones de cualquier origen de forma segura
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
