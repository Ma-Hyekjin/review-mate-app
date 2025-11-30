// app/(core)/all/page.tsx
"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import ProfileArea from "@/components/features/all/ProfileArea";
import ReviewListSection from "@/components/features/all/ReviewListSection";
import MoreMenuButton from "@/components/features/all/MoreMenuButton";
import type { UserMateInfo, UserProfile, Review } from '@/types';
import { ROUTES } from '@/constants';
import { useAuth } from "@/hooks";

export default function AllPage() {
  const router = useRouter();
  const { session, status, handleLogout } = useAuth();

  // TODO: [DB] 실제 데이터 Fetch 로직을 여기에 구현해야 합니다.
  const mateInfo: UserMateInfo = { name: "메이트", persona: "20대 남성, ENFP", profileImage: "/mate-image.png" };
  const userProfile: UserProfile = { age: "28세", gender: "여성", tendency: "감성적" }; // 새 디자인 요소 더미 데이터

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.replace(ROUTES.LOGIN);
    return null;
  }
  
  
  // 더미 리뷰 데이터 (ReviewListSection에 전달)
  const dummyReviews: Review[] = [
    { id: 1, title: "강남역 카페 리뷰", content: "산미가 적절한 커피가 좋았어요...", rating: 5, imageUrl: "/review-placeholder.png" },
    { id: 2, title: "홍대 맛집 리뷰", content: "웨이팅이 길었지만 맛있었습니다.", rating: 4, imageUrl: null },
    // ... 실제 리뷰 데이터는 DB에서 가져옵니다.
  ];


  return (
    <div className="relative min-h-screen pb-16">
      <main className="mx-auto max-w-lg">
        {/* --- 1. 상단 타이틀 및 'More' 버튼 --- */}
        <div className="flex items-center justify-between p-4 sm:p-6">
          <h1 className="text-3xl font-bold">전체</h1>
          <MoreMenuButton /> {/* 더보기 팝업/모달을 처리할 컴포넌트 */}
        </div>

        {/* --- 2. 프로필 및 메이트 영역 --- */}
        <ProfileArea
          session={session}
          userProfile={userProfile}
          mateInfo={mateInfo}
          onEditProfile={() => router.push(ROUTES.ALL_EDIT_PROFILE)}
          onSwitchMate={() => router.push(ROUTES.ALL_SWITCH_MATE)}
          onLogout={handleLogout}
        />

        {/* --- 3. 리뷰 글 섹션 (스크롤 영역) --- */}
        {/* 이 부분부터는 스크롤이 가능하며, 하단 BottomNav 위에 위치합니다. */}
        <ReviewListSection 
            reviews={dummyReviews} 
            onViewSavedReviews={() => router.push(ROUTES.ALL_SAVED_REVIEWS)}
        />
        
      </main>
      
      <BottomNav />
    </div>
  );
}