import type { Metadata } from "next";
import "./globals.css";

import { VT323 } from "next/font/google";

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Brandurai",
  description: "Brandurai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vt323.variable} ${vt323.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
