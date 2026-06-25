import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomad Place Guest House | Kyrgyzstan — Horse Tours to Son-Kul",
  description:
    "Authentic guesthouse and horse tours in Kyrgyzstan. 2-day and 3-day tours to Son-Kul lake from Kyzart village, Naryn Region. Stay close. Live deeper.",
  keywords: "Kyrgyzstan, guest house, horse tours, Son-Kul lake, yurt, nomad, Naryn, Kyzart",
  openGraph: {
    title: "Nomad Place Guest House | Kyrgyzstan",
    description: "Authentic horse tours and guesthouse in Kyrgyzstan. Discover Son-Kul lake.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/nomad-place-logo.jpg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
