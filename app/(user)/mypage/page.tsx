// app/(user)/mypage/page.tsx
"use client";

import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function MyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // TODO: [DB] 실제 메이트 정보는 현재 '활성화된 메이트' 정보를 DB에서 불러와야 합니다.
  const mateInfo = { name: "메이트", persona: "20대 남성, ENFP", profileImage: "/mate-image.png" };

  // 세션을 불러오는 동안 로딩 화면을 보여줍니다.
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  // 로그인하지 않은 사용자는 로그인 페이지로 보냅니다.
  if (status === "unauthenticated") {
    router.replace('/login'); // replace를 사용해 뒤로가기 기록을 남기지 않습니다.
    return null;
  }

  return (
    <div className="relative min-h-screen pb-16">
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <h1 className="text-3xl font-bold mb-6">마이페이지</h1>
          <div className="space-y-6">
            {/* --- 1. 나의 정보 카드 (useSession 연동) --- */}
            <div className="rounded-lg border p-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image 
                      src={session?.user?.image || "/user-profile.png"} // 구글 프로필 이미지
                      alt="사용자 프로필" 
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{session?.user?.name}</p> {/* 구글 이름 */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p> {/* 구글 이메일 */}
                  </div>
                </div>
                <button onClick={() => router.push('/edit-profile')} className="rounded-md border px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
                  수정
                </button>
              </div>
            </div>

            {/* --- 2. 메이트 정보 카드 (기존과 동일) --- */}
            <div className="rounded-lg border p-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image src={mateInfo.profileImage} alt="메이트 프로필" layout="fill" objectFit="cover" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{mateInfo.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{mateInfo.persona}</p>
                  </div>
                </div>
                <button onClick={() => router.push('/switch-mate')} className="rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  전환
                </button>
              </div>
            </div>

            {/* --- 3. 기타 메뉴 영역 (기존과 동일) --- */}
            <div className="border-t pt-6 dark:border-gray-700">
              <ul className="space-y-2">
                <li onClick={() => router.push('/saved-reviews')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>저장된 리뷰</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                <li onClick={() => router.push('/events')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>이벤트</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                <li onClick={() => router.push('/qna')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>Q&A</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                <li onClick={() => router.push('/support')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>고객센터</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                <li onClick={() => router.push('/privacy')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>개인정보 보호</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
              </ul>
            </div>

            {/* --- 4. 로그아웃 버튼 (하단 정보 대체) --- */}
            <div className="mt-12 text-center">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })} // 로그아웃 후 로그인 페이지로 이동
                className="text-sm text-gray-400 underline hover:text-red-500 dark:text-gray-600 dark:hover:text-red-500"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}