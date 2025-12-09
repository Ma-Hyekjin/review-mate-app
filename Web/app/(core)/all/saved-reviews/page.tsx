// app/(user)/saved-reviews/page.tsx
"use client";

import { useState } from "react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import type { SavedReview } from '@/types/review';
import { showSuccess } from "@/utils/toast";
import { logInfo } from "@/lib/logger";

// TODO: [DB] 이 데이터는 DB에서 사용자가 저장한 리뷰 목록을 '불러와야(fetch)' 합니다.
const initialSavedReviews: SavedReview[] = [
  { id: 1, mateName: "메이트", mateProfileImage: "/mate-image.png", reviewText: "강남 알베르 카페는 정말 최고였어요! 특히 티라미수는 인생 디저트 등극! 분위기도 좋아서 데이트하기 딱 좋은 곳이에요. 강력 추천합니다!", createdAt: "2025-09-27T14:00:00Z", photos: ["/sample-photo-1.png"] },
  { id: 2, mateName: "친절한 리뷰어", mateProfileImage: "/user-profile.png", reviewText: "이번에 새로 나온 영화, 기대 이상이었습니다. 배우들의 연기력이 돋보였고, 스토리 전개도 흥미진진했습니다. 꼭 한번 보세요.", createdAt: "2025-09-26T18:30:00Z", photos: [] },
];

// 각 리뷰 카드를 위한 컴포넌트
function ReviewCard({ review }: { review: SavedReview }) {
  // TODO: [DB] 각 카드의 평점과 피드백은 DB에 저장되고 '불러와져야(fetch)' 합니다.
  const [rating, setRating] = useState(0); // 0점은 미평가 상태
  const [feedback, setFeedback] = useState("");

  const handleRating = (rate: number) => {
    setRating(rate);
    // TODO: [DB] 변경된 평점(rate)을 review.id 기준으로 DB에 '업데이트(update)'해야 합니다.
  };

  const handleFeedbackSubmit = () => {
    // TODO: [DB] 작성된 피드백(feedback)을 review.id 기준으로 DB에 '업데이트(update)'해야 합니다.
    logInfo(`리뷰 ${review.id}에 대한 피드백 저장`, { feedback });
    showSuccess("소중한 의견 감사합니다!");
  };

  return (
    <div className="space-y-3 rounded-lg border p-4 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full"><Image src={review.mateProfileImage} alt={review.mateName} layout="fill" objectFit="cover" /></div>
        <span className="text-sm font-semibold">{review.mateName}</span>
      </div>
      <p className="text-sm text-gray-800 dark:text-gray-300">{review.reviewText}</p>
      {review.photos.length > 0 && (<div className="relative aspect-video w-full overflow-hidden rounded-md"><Image src={review.photos[0]} alt="리뷰 사진" layout="fill" objectFit="cover" /></div>)}
      <div className="border-t pt-3 dark:border-gray-600">
        <p className="mb-2 text-center text-xs text-gray-500">이 리뷰는 어떠셨나요?</p>
        <div className="flex justify-center gap-1">
          {[...Array(10)].map((_, index) => {
            const starValue = index + 1;
            return (<button key={starValue} onClick={() => handleRating(starValue)}><FaStar color={starValue <= rating ? "#ffc107" : "#e4e5e9"} size={20} /></button>);
          })}
        </div>
        {rating > 0 && rating <= 5 && (
          <div className="mt-3 space-y-2">
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3} placeholder="어떤 점이 아쉬웠는지 알려주시면 메이트 개선에 큰 도움이 됩니다." className="w-full rounded-lg border bg-transparent p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:focus:ring-white" />
            <button onClick={handleFeedbackSubmit} className="w-full rounded-md bg-gray-100 py-1 text-xs dark:bg-gray-800">피드백 제출</button>
          </div>
        )}
      </div>
    </div>
  );
}

// 메인 페이지 컴포넌트
export default function SavedReviewsPage() {
  const [reviews, setReviews] = useState(initialSavedReviews);

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <SubPageHeader title="저장된 리뷰" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 text-sm text-gray-500">
            <p>총 {reviews.length}개의 리뷰가 저장되어 있습니다. (최대 20개)</p>
            {/* TODO: [유료모델] 나중에 유료 모델 확장 시 이 제한을 늘릴 수 있습니다. */}
          </div>
          {/* TODO: [UI/UX] 저장된 리뷰가 하나도 없을 때 보여줄 '비어있는 상태(Empty State)' UI가 필요합니다. */}
          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}