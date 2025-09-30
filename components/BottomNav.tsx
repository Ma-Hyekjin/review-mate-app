// components/BottomNav.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaUser, FaPen, FaStore } from "react-icons/fa";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const activeStyle = "text-black dark:text-white";
  const inactiveStyle = "text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white";

  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full border-t bg-white dark:border-gray-600 dark:bg-black">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        <button
          onClick={() => router.push("/mypage")}
          className={`flex flex-col items-center gap-1 transition ${pathname.startsWith('/mypage') ? activeStyle : inactiveStyle}`}
        >
          <FaUser size={20} />
          <span className="text-xs">마이페이지</span>
        </button>
        
        <button
          onClick={() => router.push("/main")}
          className={`flex flex-col items-center gap-1 transition ${pathname === '/main' ? activeStyle : inactiveStyle}`}
        >
          <FaPen size={20} />
          <span className="text-xs">생성하기</span>
        </button>
        
        <button disabled className="flex flex-col items-center gap-1 text-gray-300 dark:text-gray-700">
          <FaStore size={20} />
          <span className="text-xs">마켓</span>
        </button>
      </div>
    </nav>
  );
}