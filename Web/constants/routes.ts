// constants/routes.ts
// 라우트 경로 상수 정의

export const ROUTES = {
  // 인증 관련
  LOGIN: '/login',
  QUICK_PICK: '/quick-pick',
  QUICK_PICK_COMPLETE: '/quick-pick/complete',
  
  // 메인 기능
  MAIN: '/main',
  ALL: '/all',
  
  // 전체 페이지 하위 경로
  ALL_EDIT_PROFILE: '/all/edit-profile',
  ALL_SWITCH_MATE: '/all/switch-mate',
  ALL_SAVED_REVIEWS: '/all/saved-reviews',
  ALL_EVENTS: '/all/events',
  ALL_EVENT_DETAIL: (eventId: string) => `/all/events/${eventId}`,
  ALL_MATE_DETAIL: (mateId: string) => `/all/switch-mate/${mateId}`,
  ALL_PRIVACY: '/all/privacy',
  ALL_QNA: '/all/qna',
  ALL_SUPPORT: '/all/support',
  
  // 사용자 관련
  NOTIFICATIONS: '/notifications',
} as const;

