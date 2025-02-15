import type { Metadata } from "next";
import { Archivo, Inter,Spectral,Cardo } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Providers";
// import localFont from "next/font/local";
import Footer from "@/components/Layout/Footer";
import Information from "@/components/Layout/Information";
import NavBar2 from "@/components/Layout/NavBar2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const archivo = Cardo({ 
   display: "swap",
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
});

// const lorin = localFont({
//   src: "./fonts/LorinRegular.ttf",
//   display: "swap",
//   weight: "400",
//   variable: "--font-lorin",
// });
const lorin = Spectral({
  display: "swap",
  weight: "400",
  variable: "--font-lorin",
  subsets: ["latin"],

});


const inter = Cardo({
  display: "swap",
  weight: "400",
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rezolvate",
  description: "Legal solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${lorin.variable} ${inter.variable} antialiased`}
      >
        <Providers>
          <NavBar2 />
          {children}
          <Information />
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
