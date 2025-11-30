// app/(auth)/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { ASSETS, ROUTES } from '@/constants';
import { showError } from '@/utils/toast';

function LoginContent() {
  const searchParams = useSearchParams();
  const [errorShown, setErrorShown] = useState(false);

  // NextAuth 에러 처리
  useEffect(() => {
    const error = searchParams.get('error');
    if (error && !errorShown) {
      setErrorShown(true);
      // NextAuth 에러 코드를 사용자 친화적인 메시지로 변환
      const errorMessages: Record<string, string> = {
        'Configuration': '서버 설정 오류가 발생했습니다.',
        'AccessDenied': '접근이 거부되었습니다.',
        'Verification': '인증 오류가 발생했습니다.',
        'Default': '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
      };
      const message = errorMessages[error] || errorMessages['Default'];
      showError(message);
    }
  }, [searchParams, errorShown]);

  const handleLogin = (provider: "kakao" | "google" | "naver") => {
    // NextAuth는 기본적으로 redirect: true이므로 에러는 URL 파라미터로 전달됨
    signIn(provider, {
      callbackUrl: ROUTES.QUICK_PICK,
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-t from-blue-light-200 via-blue-light-100 to-background">

      {/* === 1. 배경 로고 === */}
      <div className="absolute top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-none z-0 opacity-50 flex justify-center">
        <Image
          src={ASSETS.LOGO_GRADIENT}
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
            <Image src={ASSETS.BUTTON_KAKAO} width={340} height={50} alt="카카오 로그인" />
          </button>
          <button
            onClick={() => handleLogin("google")}
            className="transition hover:opacity-90"
          >
            <Image src={ASSETS.BUTTON_GOOGLE} width={340} height={50} alt="Google 로그인" />
          </button>
          <button
            onClick={() => handleLogin("naver")}
            className="transition hover:opacity-90"
          >
            <Image src={ASSETS.BUTTON_NAVER} width={340} height={50} alt="네이버 로그인" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-t from-blue-light-200 via-blue-light-100 to-background">
        <div className="text-caption text-gray-6">로딩 중...</div>
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}