// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    // CORRECCIÓN: Usamos ExtraBold que es el que sí tienes
    {
      path: "../../public/fonts/Montserrat-ExtraBold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Estudio Camaleón | Desarrollo de Software",
  description: "Soluciones digitales robustas y escalables.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
