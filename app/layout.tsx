import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Sahithyotsav 2k26 | A Celebration of Literature",
  description: "Join us for Sahithyotsav — a two-day literary fest featuring debates, poetry, discussions, and stories. March 13 & 14, 2k26.",
  keywords: ["sahithyotsav", "literary fest", "college event", "poetry", "debates", "literature", "2k26"],
  authors: [{ name: "Sahithyotsav Committee" }],
  openGraph: {
    title: "Sahithyotsav 2k26 | A Celebration of Literature",
    description: "A two-day literary fest bringing together debates, poetry, discussions, and stories that inspire and transform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahithyotsav 2k26",
    description: "A two-day literary fest bringing together debates, poetry, discussions, and stories.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-white text-[#1a0040]">
        <ScrollProgress className="h-[3px] bg-gradient-to-r from-[#f1cd76] via-[#d0a651] to-[#cbb386]" />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
