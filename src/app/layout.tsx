// src/app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";
import { montserrat } from "@/styles/font"; // Importamos la fuente

export const metadata: Metadata = {
  title: "Estudio Camaleón | Desarrollo de Software",
  description: "Soluciones digitales robustas y escalables.",
  icons: {
    icon: "/icons/LogoWeb.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "diseño web profesional",
    "páginas web modernas",
    "diseño web para negocios",
    "desarrollo de landing pages",
    "diseño UX/UI",
    "diseño web responsive",
    "páginas web para empresas",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className={`${montserrat.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
