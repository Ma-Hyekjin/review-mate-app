// app/layout.tsx
import type { Metadata } from "next";
// import localFont from 'next/font/local'; // localFont는 이제 필요 없어요
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Geist_Mono } from "next/font/google"; // Geist Mono는 유지

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
    <html lang="ko" suppressHydrationWarning={true}>
      <head>
        {/* 👇 여기에 Spoqa 폰트 링크 태그 추가 */}
        <link
          href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
          rel='stylesheet'
          type='text/css'
        />
      </head>
      {/* 👇 body 클래스에 font-sans 추가 (tailwind.config.ts 설정과 연동) */}
      <body className={`${geistMono.variable} font-sans antialiased`}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}