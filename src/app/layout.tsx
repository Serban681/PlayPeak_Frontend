// 'use client'

import type { Metadata } from "next";
import "./globals.css";
import { Josefin_Sans, Righteous } from "next/font/google";
import Header from "@/components/styled-components/Header";
import { Footer } from "@/components/styled-components/Footer";
import { ShopProvider } from "@/context/ShopContext";
import Notifier from "@/components/styled-components/Notifier";

export const metadata: Metadata = {
  title: "PlayPeak - Shop",
  description: "A cool sports gear shop",
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
        {/* <StoreProvider> */}
          <ShopProvider>
            <Notifier />
            <Header />
            <div className="mx-12 lg:mx-24 xl:mx-40 mt-7 min-h-screen">
                {children}
            </div>
            <Footer />
          </ShopProvider>
        {/* </StoreProvider> */}
      </body>
    </html>
  );
}
