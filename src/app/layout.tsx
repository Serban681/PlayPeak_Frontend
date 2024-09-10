// 'use client'

import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Josefin_Sans, Righteous } from "next/font/google"
import Header from "@/components/styled-components/Header";
import { Footer } from "@/components/styled-components/Footer";
import { ShopProvider } from "@/context/ShopContext";
import Notifier from "@/components/styled-components/Notifier";

export const metadata: Metadata = {
  title: "Dialog Data shop",
  description: "A cool shop in town",
};

const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"]
})

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  weight: ["300", "500"],
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`m-0 font-main font-light ${josefin.variable} ${righteous.variable}`}>
        <StoreProvider>
          <ShopProvider>
            <Notifier />
            <Header />
            <div className="mx-12 lg:mx-24 mt-7 min-h-screen">
                {children}
            </div>
            <Footer />
          </ShopProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
