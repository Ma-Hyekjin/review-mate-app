// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

export default function LoginPage() {
  const router = useRouter();

  // TODO: [DB] 이 함수는 실제 DB와 연동하여 사용자의 가입 여부를 확인해야 합니다.
  // NextAuth의 signIn 함수 콜백 내부에서 처리하게 됩니다.
  const checkUserStatus = (): "NEW_USER" | "EXISTING_USER" => {
    // 현재는 50% 확률로 신규 또는 기존 사용자를 반환하는 시뮬레이션입니다.
    return Math.random() > 0.5 ? "EXISTING_USER" : "NEW_USER";
  };

  const handleLogin = (provider: string) => {
    console.log(`${provider}로 로그인을 시도합니다.`);

    // TODO: [AUTH] 실제로는 NextAuth의 signIn(provider) 함수를 호출해야 합니다.
    // signIn 함수가 성공적으로 완료되면, 콜백 URL 또는 응답값을 기반으로
    // 신규/기존 사용자를 판별하고 아래의 라우팅 로직을 실행합니다.

    const userStatus = checkUserStatus();
    console.log("사용자 상태:", userStatus);

    if (userStatus === "NEW_USER") {
      router.push("/quick-pick");
    } else {
      router.push("/main");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-8 text-center">
        <h1 className="text-3xl font-bold">리뷰메이트 시작하기</h1>
        <p className="text-gray-600 dark:text-gray-400">
          SNS 계정으로 1초 만에 시작하세요.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin("Google")}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white p-3 text-black transition hover:bg-gray-100 dark:border-gray-600 dark:bg-transparent dark:text-white dark:hover:bg-gray-800"
          >
            <FcGoogle size={22} />
            <span>Google로 계속하기</span>
          </button>
          <button
            onClick={() => handleLogin("Kakao")}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#FEE500] p-3 text-black transition hover:opacity-90"
          >
            <RiKakaoTalkFill size={22} />
            <span>카카오로 계속하기</span>
          </button>
          <button
            onClick={() => handleLogin("Naver")}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#03C75A] p-3 text-white transition hover:opacity-90"
          >
            <SiNaver size={18} />
            <span>네이버로 계속하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}