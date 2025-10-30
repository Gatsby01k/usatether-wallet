// app/fonts.ts
import { Sora, Inter } from "next/font/google";

export const display = Sora({
  subsets: ["latin"],
  weight: ["600","700","800"],
  variable: "--font-display",
});

export const ui = Inter({
  subsets: ["latin"],
  weight: ["400","500","600"],
  variable: "--font-ui",
});
