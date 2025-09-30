// components/TopNav.tsx
"use client";

import { useRouter } from "next/navigation";
import { FaRegBell } from "react-icons/fa";

export default function TopNav() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 z-10 w-full flex h-14 items-center justify-between border-b bg-white px-4 dark:border-gray-700 dark:bg-black">
      <h1 className="text-xl font-bold">ReviewMate</h1>
      <button 
        onClick={() => router.push('/notifications')} 
        className="p-2"
      >
        <FaRegBell size={22} />
      </button>
    </header>
  );
}