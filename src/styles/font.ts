// src/styles/font.ts
import localFont from "next/font/local";

export const montserrat = localFont({
  // Añadimos 'export'
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
    {
      path: "../../public/fonts/Montserrat-ExtraBold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});
