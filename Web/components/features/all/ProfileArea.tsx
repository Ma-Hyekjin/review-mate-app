// components/features/all/ProfileArea.tsx
import React from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import type { UserMateInfo, UserProfile } from '@/types';

interface ProfileAreaProps {
  session: Session | null; // 세션 데이터
  userProfile: UserProfile; // 사용자 추가 정보
  mateInfo: UserMateInfo; // 메이트 정보
  onEditProfile: () => void; // 프로필 수정 핸들러
  onSwitchMate: () => void; // 메이트 전환 핸들러
  onLogout: () => void; // 로그아웃 핸들러
}

export default function ProfileArea({
  session,
  userProfile,
  mateInfo,
  onEditProfile,
  onSwitchMate,
  onLogout,
}: ProfileAreaProps) {
  
  const user = session?.user;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6">
      
      {/* 1. 사용자 프로필 및 수정 버튼 영역 */}
      <div className="rounded-xl border p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          
          {/* 프로필 사진 및 이름 */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary-light">
              <Image 
                src={user?.image || "/user-profile.png"} // 구글 프로필 이미지
                alt="사용자 프로필" 
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold">{user?.name}님</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">나의 리뷰 성향</p>
            </div>
          </div>
          
          {/* 수정 버튼 */}
          <button 
            onClick={onEditProfile} 
            className="rounded-full bg-blue-light-100 px-4 py-1 text-sm font-medium text-primary-dark transition hover:bg-blue-light-200"
          >
            수정
          </button>
        </div>
        
        {/* --- 나이, 성별, 성향 섹션 --- */}
        <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
          <ProfileDetailItem label="나이" value={userProfile.age} />
          <ProfileDetailItem label="성별" value={userProfile.gender} />
          <ProfileDetailItem label="성향" value={userProfile.tendency} />
        </div>
      </div>

      {/* 2. 메이트 정보 및 전환/로그아웃 버튼 영역 */}
      <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image 
              src={mateInfo.profileImage} 
              alt="메이트 프로필" 
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{mateInfo.name}</p>
              {mateInfo.isDefault && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  [기본]
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{mateInfo.persona}</p>
          </div>
        </div>

        {/* 전환 & 로그아웃 버튼 그룹 */}
        <div className="flex space-x-3">
          <button 
            onClick={onSwitchMate} 
            className="rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            전환
          </button>
          <button
            onClick={onLogout}
            className="rounded-full bg-gray-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-gray-600"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

// 재사용 가능한 작은 컴포넌트 (나이/성별/성향 표시)
const ProfileDetailItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-lg font-bold mt-1 text-gray-900 dark:text-white">{value}</span>
  </div>
);