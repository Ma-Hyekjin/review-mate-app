// constants/api.ts
// API 엔드포인트 상수 정의

export const API_ENDPOINTS = {
  // 인증
  AUTH: '/api/auth',
  
  // 리뷰 생성
  GENERATE: '/api/generate',
  
  // 메이트
  MATE: '/api/mate',
  
  // 리뷰 (향후 추가)
  REVIEWS: '/api/reviews',
  REVIEWS_SAVE: '/api/reviews/save',
} as const;

