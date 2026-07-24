import type { Metadata } from "next";
import { Alegreya, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./site-config";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const alegreya = Alegreya({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.city}, ${siteConfig.state}`,
  description:
    "Pousada na Praia do Rosa, em Imbituba, com piscina ao ar livre, jardim, churrasqueira e quartos privativos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sourceSans.variable} ${alegreya.variable}`}>
        {children}
      </body>
    </html>
  );
}
