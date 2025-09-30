// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000); // 2초 후 이동

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">리뷰메이트</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">AI 리뷰 작성 도우미</p>
    </main>
  );
}