
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/context/FavoritesContext";
import AOSProvider from "@/components/AOSProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "EstateHub | Find Your Dream Home",
  description: "Discover the perfect property with EstateHub.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AOSProvider>
          <FavoritesProvider>
            <Navbar />

            {/* Each page renders its own <main> */}
            <div className="flex-1">{children}</div>

            <Footer />
          </FavoritesProvider>
        </AOSProvider>
      </body>
    </html>
  );
}
