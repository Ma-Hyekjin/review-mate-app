// app/(auth)/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const LOGO_PATH = "/assets/logos/review-mate-app-logo-gradient.svg";
const KAKAO_BTN_PATH = "/assets/buttons/signup-kakao.svg";
const GOOGLE_BTN_PATH = "/assets/buttons/signup-google.svg";
const NAVER_BTN_PATH = "/assets/buttons/signup-naver.svg";

export default function LoginPage() {

  const handleLogin = (provider: "kakao" | "google" | "naver") => {
    signIn(provider, {
      callbackUrl: "/quick-pick",
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-t from-blue-light-200 via-blue-light-100 to-background">

      {/* === 1. 배경 로고 === */}
      <div className="absolute top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-none z-0 opacity-50 flex justify-center">
        <Image
          src={LOGO_PATH}
          width={468}
          height={361}
          alt="리뷰메이트 로고 배경"
          priority

          className="h-[55vh] w-auto"
        />
      </div>

      {/* === 2. 로그인 콘텐츠 === */}
      <div className="relative z-10 flex flex-col justify-end w-full max-w-xs space-y-8 text-center pt-[60vh] pb-10">

        <div className="flex flex-col">
          <h1 className="text-title-sm font-bold leading-[22px]">
            <span className="bg-[linear-gradient(360deg,_#E6FCFF_0%,_#73CEF0_37.97%,_#00A0E0_92.76%)] bg-clip-text text-transparent">
          리뷰메이트 시작하기
            </span>
          </h1>
          <p className="text-caption text-gray-6 mt-4">
            SNS 계정으로 1초만에 시작하기
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-4">
          {/* ... Kakao, Google, Naver buttons ... */}
           <button
            onClick={() => handleLogin("kakao")}
            className="transition hover:opacity-90"
          >
            <Image src={KAKAO_BTN_PATH} width={340} height={50} alt="카카오 로그인" />
          </button>
          <button
            onClick={() => handleLogin("google")}
            className="transition hover:opacity-90"
          >
            <Image src={GOOGLE_BTN_PATH} width={340} height={50} alt="Google 로그인" />
          </button>
          <button
            onClick={() => handleLogin("naver")}
            className="transition hover:opacity-90"
          >
            <Image src={NAVER_BTN_PATH} width={340} height={50} alt="네이버 로그인" />
          </button>
        </div>
      </div>
    </main>
  );
}