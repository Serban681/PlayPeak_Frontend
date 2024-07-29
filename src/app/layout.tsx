import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dialog Data shop",
  description: "A cool shop in town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
