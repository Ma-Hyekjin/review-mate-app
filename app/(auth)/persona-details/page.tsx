// app/(auth)/persona-details/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PersonaDetailsPage() {
  const router = useRouter();

  const [reviews, setReviews] = useState<string[]>(Array(5).fill(""));

  const handleReviewChange = (index: number, value: string) => {
    const newReviews = [...reviews];
    newReviews[index] = value;
    setReviews(newReviews);
  };

  const handleSave = () => {
    const savedReviews = reviews.filter(review => review.trim() !== "");
    
    // TODO: [DB] 여기서 저장된 리뷰(savedReviews)를
    // 이전에 생성된 메이트 페르소나와 연결하여 DB에 '업데이트(update)'해야 합니다.
    console.log("저장된 리뷰:", savedReviews);

    alert("설정이 저장되었습니다!");
    router.push("/main");
  };

  const handleSkip = () => {
    router.push("/main");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">메이트를 더 자세히 설정해볼까요?</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            메이트가 참고할 만한 리뷰나 텍스트를 5개까지 입력할 수 있습니다. (선택사항)
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <textarea
              key={index}
              value={review}
              onChange={(e) => handleReviewChange(index, e.target.value)}
              placeholder={`참고 텍스트 #${index + 1}`}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:focus:ring-white"
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleSkip} 
            className="w-full rounded-lg border p-4 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            건너뛰기
          </button>
          <button 
            onClick={handleSave} 
            className="w-full rounded-lg bg-black p-4 text-white dark:bg-white dark:text-black"
          >
            저장하고 시작하기
          </button>
        </div>
      </div>
    </main>
  );
}