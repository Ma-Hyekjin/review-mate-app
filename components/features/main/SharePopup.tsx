// components/features/main/SharePopup.tsx
"use client";

import React, { useEffect } from 'react';
import { SiNaver, SiGooglemaps } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPlatformClick: (platform: string) => void;
}

const PLATFORMS = [
  { 
    id: 'naver-map', 
    name: '네이버지도', 
    icon: SiNaver,
    color: '#03C75A'
  },
  { 
    id: 'kakao-map', 
    name: '카카오맵', 
    icon: RiKakaoTalkFill,
    color: '#FEE500'
  },
  { 
    id: 'google-map', 
    name: '구글맵', 
    icon: SiGooglemaps,
    color: '#4285F4'
  },
];

export default function SharePopup({
  isOpen,
  onClose,
  onPlatformClick,
}: SharePopupProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 - 덜 어둡게 */}
      <div
        className="fixed inset-0 bg-black/30 z-[100] transition-opacity"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />
      
      {/* 팝업 컨텐츠 - 모바일 크기로 제한 (데스크탑에서도), 바텀 네비게이션 고려 */}
      <div
        className="fixed bg-white rounded-t-3xl z-[101] shadow-2xl"
        style={{
          width: '100%',
          maxWidth: '375px', // 모바일 최대 너비
          left: '50%', // 가로 중앙 정렬
          transform: 'translateX(-50%)', // 중앙 정렬 보정
          bottom: '80px', // 바텀 네비게이션 높이 (h-20 = 80px)
          height: 'calc(65vh - 80px)', // 프롬프트 영역 높이에서 바텀 네비게이션 제외
          maxHeight: 'calc(65vh - 80px)',
          animation: 'slideUp 0.3s ease-out',
          borderTop: '1px solid #E6FCFF',
        }}
      >
        <div className="h-full flex flex-col p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-center mb-6 flex-shrink-0 relative">
            <h2 
              className="text-lg font-semibold text-center"
              style={{
                fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                color: '#12121E',
              }}
            >
              텍스트 공유
            </h2>
            <button
              onClick={onClose}
              className="absolute right-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 설명 텍스트 - 가운데 정렬 */}
          <p 
            className="text-sm mb-6 flex-shrink-0 text-center"
            style={{
              fontFamily: '"Spoqa Han Sans Neo", sans-serif',
              color: '#666666',
            }}
          >
            복사한 리뷰를 원하는 사이트에 올리세요
          </p>

          {/* 플랫폼 아이콘 그룹 - 박스 없이 가로 배치 */}
          <div className="flex items-center justify-center gap-6 flex-1">
            {PLATFORMS.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <button
                  key={platform.id}
                  onClick={() => onPlatformClick(platform.id)}
                  className="flex flex-col items-center justify-center transition-opacity hover:opacity-80 active:opacity-60"
                  style={{
                    fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      size={48}
                      color={platform.color}
                    />
                  )}
                  <span 
                    className="text-xs font-medium text-center mt-2"
                    style={{
                      color: '#12121E',
                    }}
                  >
                    {platform.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </>
  );
}

