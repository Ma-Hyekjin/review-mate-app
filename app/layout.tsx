// app/layout.tsx
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google"; // Geist_Mono만 사용하거나 필요에 따라 GeistSans 추가
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReviewMate App",
  description: "AI Review Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistMono.variable} antialiased`}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}