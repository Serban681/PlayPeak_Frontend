// 'use client'

import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Josefin_Sans, Righteous } from "next/font/google"
import Header from "@/components/styled-components/Header";
import { Footer } from "@/components/styled-components/Footer";

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
          <Header />
          <div className="mx-12 mt-7">
            {children}
          </div>
          {/* <Footer /> */}
        </StoreProvider>
      </body>
    </html>
  );
}
