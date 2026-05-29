import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  //  CORRECTO: Movido al nivel superior y renombrado a 'turbopack'
  // Esto define la raíz del proyecto correctamente y silencia la advertencia de múltiples lockfiles.
  turbopack: {
    root: ".",
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
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
