import type { Metadata } from "next";
import "./globals.css";

import { Jersey_15 as JerseyFont } from "next/font/google";

const Jersey_15 = JerseyFont({
  variable: "--font-jersey-15",
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
        className={`${Jersey_15.variable} ${Jersey_15.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
