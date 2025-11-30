// types/review.ts
// 리뷰 관련 타입 정의

/**
 * 리뷰 기본 정보
 */
export interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
  imageUrl: string | null;
}

/**
 * 저장된 리뷰 (DB에서 조회)
 */
export interface SavedReview {
  id: number;
  mateName: string;
  mateProfileImage: string;
  reviewText: string;
  createdAt: string;
  photos: string[];
}

/**
 * ReviewListSection 컴포넌트 Props
 */
export interface ReviewListSectionProps {
  reviews: Review[];
  onViewSavedReviews: () => void;
}

