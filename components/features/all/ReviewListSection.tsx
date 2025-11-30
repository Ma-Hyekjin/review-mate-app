// components/features/all/ReviewListSection.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegStar, FaStar } from 'react-icons/fa';
import type { Review, ReviewListSectionProps } from '@/types/review';

export default function ReviewListSection({ reviews, onViewSavedReviews }: ReviewListSectionProps) {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  // 리뷰 정렬 로직 (더미 데이터에서는 단순하게 처리)
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === 'latest') {
      return b.id - a.id; // ID가 높을수록 최신이라고 가정
    } else {
      return a.id - b.id;
    }
  });
  
  // 리뷰가 없을 때 표시할 UI
  if (reviews.length === 0) {
      return (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p>아직 저장된 리뷰가 없습니다.</p>
              <button 
                  onClick={onViewSavedReviews} 
                  className="mt-4 text-sm font-medium text-primary-light hover:underline"
              >
                  다른 메이트의 리뷰 보러가기
              </button>
          </div>
      );
  }

  return (
    <div className="px-4 sm:px-6 mt-6">
      
      {/* --- 1. 리뷰 목록 제목 및 정렬 버튼 --- */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4 dark:border-gray-700">
        <h2 className="text-xl font-bold">리뷰글 섹션</h2>
        
        {/* 정렬 버튼 그룹 */}
        <div className="flex space-x-2 text-sm font-medium">
          <button
            onClick={() => setSortOrder('latest')}
            className={`transition-colors ${sortOrder === 'latest' ? 'text-primary-dark underline' : 'text-gray-500 hover:text-gray-700'}`}
          >
            최신순
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`transition-colors ${sortOrder === 'oldest' ? 'text-primary-dark underline' : 'text-gray-500 hover:text-gray-700'}`}
          >
            오래된 순
          </button>
        </div>
      </div>

      {/* --- 2. 리뷰 목록 --- */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

// 개별 리뷰 아이템 컴포넌트
const ReviewItem = ({ review }: { review: Review }) => {
  // 별점 렌더링
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 dark:text-gray-600" />
        )
      );
    }
    return <div className="flex space-x-0.5">{stars}</div>;
  };

  return (
    <div className="border border-gray-100 rounded-lg p-4 shadow-sm dark:border-gray-800 flex flex-col gap-3">
      
      {/* 제목 및 별점 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold truncate">{review.title}</h3>
        {renderStars(review.rating)}
      </div>

      {/* 내용 및 사진 */}
      <div className="flex gap-4">
        <div className="flex-1">
          {/* 내용 (스크롤링이 필요할 수 있는 영역) */}
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {review.content}
          </p>
          {/* 하단 텍스트 박스 */}
          <div className="mt-2 text-xs text-primary-dark bg-blue-light-100/50 p-1 rounded">
            이 리뷰는 어떠셨나요? 
          </div>
        </div>

        {/* 사진 미리보기 */}
        {review.imageUrl && (
          <div className="relative shrink-0 w-20 h-20 rounded-md overflow-hidden">
            <Image 
              src={review.imageUrl} 
              alt={review.title} 
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};