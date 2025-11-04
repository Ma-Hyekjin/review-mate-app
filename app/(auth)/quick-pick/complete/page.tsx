"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LOGO_PATH = "/assets/logos/review-mate-app-logo-gradient.svg";

export default function QuickPickCompletePage() {
  const router = useRouter();
  const [animationState, setAnimationState] = useState("hidden"); // 'hidden', 'visible', 'fading'

  useEffect(() => {
    // 1. (0.1초 후) 'visible' 상태로 변경하여 페이드인 시작
    const fadeInTimer = setTimeout(() => {
      setAnimationState("visible");
    }, 100);

    // 2. (2.5초 후) 'fading' 상태로 변경하여 페이드아웃 시작
    const fadeOutTimer = setTimeout(() => {
      setAnimationState("fading");
    }, 2500);

    // 3. (2.5초 후) 메인 페이지로 이동
    const redirectTimer = setTimeout(() => {
      router.push("/main");
    }, 2500);

    // 컴포넌트 언마운트 시 모든 타이머 제거
    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className="relative min-h-screen p-4 overflow-hidden bg-gradient-to-t from-blue-light-300 to-background">
      {/* === 중앙 정렬 컨테이너 === */}
      <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col items-center justify-center">

        {/* === 1. 배경 로고 (z-0) === */}
        <div className="absolute top-[15vh] left-0 w-full z-0 opacity-90 flex justify-center">
          <Image
            src={LOGO_PATH}
            width={468}
            height={361}
            alt="리뷰메이트 로고 배경"
            priority
            className="h-[55vh] w-auto"
          />
        </div>

        {/* === 2. 버블 (우측 하단) (z-0) === */}
        <div 
          className="absolute w-[456px] h-[425px] z-0 opacity-80"
          style={{
            top: '444px',
            left: '200px',
            borderRadius: '212.5px',
            transform: 'rotate(-30deg)',
            background: 'radial-gradient(109.14% 123.27% at 159.14% -9.14%, #E6FCFF 0%, #73CEF0 37.97%, rgba(0, 160, 224, 0.1) 92.76%)'
          }}
        />

        {/* === 3. 버블 (좌측 상단) (z-0) === */}
        <div 
          className="absolute w-[456px] h-[425px] z-0 opacity-80"
          style={{
            top: '-134.53px',
            left: '-243.7px',
            borderRadius: '150px 200px 300px 150px',
            transform: 'rotate(-30deg)',
            background: 'radial-gradient(109.14% 123.27% at 159.14% -9.14%, #E6FCFF 0%, #73CEF0 37.97%, rgba(0, 160, 224, 0.1) 92.76%)'
          }}
        />

        {/* === 4. 완료! 콘텐츠 (z-10) === */}
        <div 
          className={`absolute z-10 flex flex-col items-center justify-center text-center
            transition-opacity duration-500 ease-in-out
            ${
              animationState === 'visible' ? 'opacity-100' : 'opacity-0'
            }
          `}
        >
          {/* "완료!" 서클 */}
          <div className="w-[197px] h-[197px] rounded-full bg-primary-light flex items-center justify-center shadow-lg">
            <h1 className="text-title-lg font-bold text-white leading-[22px]">
              완료!
            </h1>
          </div>
          
          {/* 3초 멘트는 삭제됨 */}
        </div>

      </div>
    </main>
  );
}