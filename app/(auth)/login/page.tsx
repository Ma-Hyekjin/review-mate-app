// app/(auth)/login/page.tsx
"use client";

// NextAuth에서 제공하는 실제 로그인 함수를 불러옵니다.
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

export default function LoginPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-8 text-center">
        <h1 className="text-3xl font-bold">리뷰메이트 시작하기</h1>
        <p className="text-gray-600 dark:text-gray-400">
          SNS 계정으로 1초 만에 시작하세요.
        </p>

        <div className="flex flex-col gap-4">
          {/* onClick에 signIn('google') 함수를 직접 연결합니다. */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/main" })}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white p-3 text-black transition hover:bg-gray-100 dark:border-gray-600 dark:bg-transparent dark:text-white dark:hover:bg-gray-800"
          >
            <FcGoogle size={22} />
            <span>Google로 계속하기</span>
          </button>
          
          {/* 다른 버튼들은 아직 기능이 없으므로 비활성화 처리해두는 것이 좋습니다. */}
          <button
            disabled
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#FEE500] p-3 text-black transition hover:opacity-90 disabled:opacity-50"
          >
            <RiKakaoTalkFill size={22} />
            <span>카카오로 계속하기</span>
          </button>
          <button
            onClick={() => signIn("naver", { callbackUrl: "/main" })}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#03C75A] p-3 text-white transition hover:opacity-90 disabled:opacity-50"
          >
            <SiNaver size={18} />
            <span>네이버로 계속하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}