// components/all/MoreMenuButton.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoEllipsisHorizontal } from 'react-icons/io5'; // '더보기' 아이콘

export default function MoreMenuButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴 항목 정의 (경로를 /all/ 경로에 맞춥니다)
  const menuItems = [
    { label: "이벤트", path: "/all/events" },
    { label: "Q&A", path: "/all/qna" },
    { label: "고객센터", path: "/all/support" },
    { label: "개인정보 보호", path: "/all/privacy" },
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false); // 메뉴 닫기
    router.push(path); // 페이지 이동
  };

  return (
    <div className="relative">
      {/* 1. More 버튼 (트리거) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="더보기 메뉴 열기"
      >
        <IoEllipsisHorizontal className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      {/* 2. 메뉴 팝업 (조건부 렌더링) */}
      {isOpen && (
        <>
          {/* 오버레이 (클릭 시 닫기) */}
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsOpen(false)}
          />

          {/* 팝업 메뉴 박스 */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-30 border border-gray-200 dark:border-gray-700">
            <ul className="py-1">
              {menuItems.map((item) => (
                <li
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-light-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}