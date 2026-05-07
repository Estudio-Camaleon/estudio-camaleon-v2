import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* Aquí puedes añadir configuraciones a futuro como:
     - Redirecciones (redirects)
     - Headers de seguridad
     - Dominios de imágenes permitidos
  */
};

export default withBundleAnalyzer(nextConfig);
