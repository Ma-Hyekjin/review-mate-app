// app/(user)/mypage/page.tsx
"use client";

import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  
  const userInfo = { name: "김혁진", email: "hyeokjin@example.com" };
  const mateInfo = { name: "메이트", persona: "20대 남성, ENFP", profileImage: "/mate-image.png" };

  return (
    <div className="relative min-h-screen pb-16">
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <h1 className="text-3xl font-bold mb-6">마이페이지</h1>
          <div className="space-y-6">
            <div className="rounded-lg border p-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image src="/user-profile.png" alt="사용자 프로필" layout="fill" objectFit="cover" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{userInfo.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo.email}</p>
                  </div>
                </div>
                {/* --- 수정된 경로 --- */}
                <button onClick={() => router.push('/mypage/edit-profile')} className="rounded-md border px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
                  수정
                </button>
              </div>
            </div>

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
                {/* --- 수정된 경로 --- */}
                <button onClick={() => router.push('/mypage/switch-mate')} className="rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  전환
                </button>
              </div>
            </div>

            <div className="border-t pt-6 dark:border-gray-700">
              <ul className="space-y-2">
                {/* --- 수정된 경로 --- */}
                <li onClick={() => router.push('/mypage/saved-reviews')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>저장된 리뷰</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                {/* --- 수정된 경로 --- */}
                <li onClick={() => router.push('/mypage/events')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>이벤트</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                {/* --- 수정된 경로 --- */}
                <li onClick={() => router.push('/mypage/qna')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>Q&A</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                {/* --- 수정된 경로 --- */}
                <li onClick={() => router.push('/mypage/support')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>고객센터</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
                {/* --- 수정된 경로 --- */}
                <li onClick={() => router.push('/mypage/privacy')} className="flex cursor-pointer items-center justify-between rounded-md p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>개인정보 보호</span>
                  <FaChevronRight className="text-gray-400" />
                </li>
              </ul>
            </div>

            <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600">
              <p>Email: tema0311@hanyang.ac.kr</p>
              <p>Tel: 02-1234-5678</p>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}