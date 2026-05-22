import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jai baba Tours  Tour and Travels | Premium Travel Agency",
  description: "Plan your next dream holiday with Jai baba Tours  Tour and Travels. Explore handpicked holiday packages, custom itineraries, and make unforgettable memories.",
  keywords: "tour packages, vacation, holidays, travel agency, Jai baba Tours  Travels, booking, explore, tourism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: "80px" }}>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
