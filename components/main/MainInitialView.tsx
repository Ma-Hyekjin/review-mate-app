// components/main/MainInitialView.tsx
import React from 'react';

export default function MainInitialView() {
  return (
    <div className="flex flex-col items-center gap-12 pt-16 text-center">
      <h1 className="text-title-md font-bold">
        <span className="bg-gradient-light bg-clip-text text-transparent">
          만나서 반가워요!
        </span>
      </h1>
      <p className="text-caption text-gray-5">
        리뷰메이트와 함께하는 리뷰 생활 시작해봐요!
      </p>
    </div>
  );
}