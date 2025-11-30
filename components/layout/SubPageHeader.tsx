// components/SubPageHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export default function SubPageHeader({ title, actionButton }: { title: string; actionButton?: React.ReactNode }) {
  const router = useRouter();

  return (
    <header className="relative flex h-14 items-center justify-center border-b dark:border-gray-700">
      <button 
        onClick={() => router.back()}
        className="absolute left-4 p-2"
      >
        <FaChevronLeft size={20} />
      </button>
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="absolute right-4">
        {actionButton}
      </div>
    </header>
  );
}