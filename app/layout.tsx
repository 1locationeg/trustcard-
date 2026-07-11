import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R8ESTATE | Professional Reputation for Real Estate Agents",
  description:
    "Build trust before your first client conversation with a verified professional profile, trust score, and identity verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col h-full antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
