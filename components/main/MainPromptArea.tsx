// components/main/MainPromptArea.tsx
import React from 'react';
import Image from 'next/image';
import { useUiStore } from '@/stores/uiStore';

interface SelectedImage {
  file: File;
  previewUrl: string;
}

interface MainPromptAreaProps {
  // 상태 (값)
  inputText: string;
  selectedImages: SelectedImage[];
  viewMode: 'initial' | 'result';
  isLoading: boolean;
  
  // 핸들러 및 Ref
  setInputText: (text: string) => void;
  // [수정 반영] removeImage: 인덱스를 받도록 타입 정의 복구
  removeImage: (index: number) => void; 
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenerateClick: () => void;
}

export default function MainPromptArea({
  inputText,
  setInputText,
  selectedImages,
  removeImage,
  fileInputRef,
  handleGenerateClick,
  viewMode,
  isLoading,
}: MainPromptAreaProps) {
  
  const { setKeyboardOpen, isKeyboardOpen } = useUiStore();
  
  return (
    // 하단 고정 프롬포트창 (65vh 고정, relative 기준)
    <div className="w-full rounded-t-3xl border-t border-blue-light-200 bg-background p-6 shadow-[0px_4px_15px_blue-light-200] flex flex-col justify-between h-[65vh] flex-shrink-0 relative">
      
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setKeyboardOpen(true)} // 키보드 열림
        onBlur={() => setKeyboardOpen(false)}  // 키보드 닫힘
        placeholder={
          viewMode === 'result'
            ? "추가 코멘트를 입력해주세요"
            : "강남역, 분위기 좋은, 산미가 있는 커피"
        }
        rows={2}
        className="w-full resize-none border-none bg-transparent p-2 text-caption text-gray-6 placeholder-gray-4 focus:outline-none focus:ring-0 dark:text-gray-3 dark:placeholder-gray-4"
      />

      {/* 이미지 미리보기 영역 (버튼 아래쪽, absolute) */}
      {selectedImages.length > 0 && (
          <div 
            className="absolute left-[20px] z-10"
            style={{top: '40%',}} 
            >
            <div className="flex space-x-2 p-1">
              <div key={0} className="relative shrink-0">
                <Image
                  src={selectedImages[0].previewUrl}
                  alt={`preview 0`}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-md object-cover"
                  />
                <button
                  // [수정 반영] removeImage(0) 호출
                  onClick={() => removeImage(0)} 
                  className="absolute -right-1 -top-1 rounded-full bg-gray-1 text-gray-700 p-0.5 border border-gray-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* --- 버튼 영역 --- */}
        
        {/* 사진첨부 버튼 */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`absolute flex h-[50px] w-[108px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-background text-caption font-medium text-gray-3 transition-all duration-300 hover:bg-blue-light-100 left-[20px] ${isKeyboardOpen ? 'top-[50%]' : 'top-[25%]'}`}>
          <Image
            src="/assets/icons/camera.svg"
            width={22}
            height={18}
            alt="사진첨부"
          />
          사진첨부
        </button>
        
        {/* 생성하기 버튼 */}
        <button
          onClick={handleGenerateClick}
          disabled={isLoading}
          className={`absolute flex h-[50px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-blue-light-100 text-caption font-medium text-primary-light transition-all duration-300 hover:bg-blue-light-200 disabled:opacity-70 disabled:bg-gray-2 right-[16px] ${isKeyboardOpen ? 'top-[50%]' : 'top-[43%]'}`}
          style={{
            width: viewMode === 'result' ? 121 : 110,
          }}
        >
          <Image
            src="/assets/icons/generate.svg"
            width={20}
            height={20}
            alt={viewMode === 'result' ? '재생성하기' : '생성하기'}
          />
          {isLoading ? '생성 중...' : (viewMode === 'result' ? '재생성하기' : '생성하기')}
        </button>
    </div>
  );
}