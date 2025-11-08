// app/(core)/main/page.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useUiStore } from "@/stores/uiStore"; 

interface SelectedImage {
  file: File;
  previewUrl: string;
}

export default function MainPage() {
  const [inputText, setInputText] = useState("");
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'initial' | 'result'>('initial');
  const [generatedReview, setGeneratedReview] = useState("");
  const { setKeyboardOpen, isKeyboardOpen } = useUiStore();

  // --- 함수 ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // 선택된 파일 중 첫 번째 파일만 사용합니다.
      const file = e.target.files[0];
      const selectedImage = {
        file,
        previewUrl: URL.createObjectURL(file),
      };
      // 기존 배열을 덮어쓰고, 새 파일만 포함하도록 설정합니다. (하나만 유지)
      setSelectedImages([selectedImage]);
    }
    // 파일을 선택한 후 input의 value를 초기화해야 같은 파일을 연속으로 선택해도 onChange가 다시 발생.
    if (e.target.files) e.target.value = ''; 
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateClick = async () => {
    // (더미 데이터 버전)
    if (inputText.trim() === "" || isLoading) {
      if (!isLoading) alert("생성할 키워드를 입력해주세요!");
      return; 
    }
    setIsLoading(true); 
    setTimeout(() => {
      setGeneratedReview(
        "AI가 생성한 더미 리뷰입니다.\n" + `입력된 키워드: ${inputText}`
      );
      setViewMode('result');
      setInputText("");
      setIsLoading(false);
    }, 1000); 
  };

  const handleCopyClick = () => {
    if (!generatedReview) return; 
    navigator.clipboard.writeText(generatedReview)
      .then(() => alert('리뷰가 클립보드에 복사되었습니다!'))
      .catch(err => alert('복사에 실패했습니다.'));
  };

  const handleResetClick = () => {
    setInputText("");
    setSelectedImages([]);
    setGeneratedReview("");
    setViewMode('initial'); 
  };
  // --- 기존 함수들 끝 ---


  return (
    <div className="flex flex-col w-full h-screen">

      {/* --- 파일 입력 필드 --- */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden" // 화면에 보이지 않도록 숨김
        accept="image/*" // 이미지 파일만 선택 가능하도록 설정
      />
      {/* --- 파일 입력 필드 --- */}
      
      {/* --- 스크롤되는 컨텐츠 영역 --- */}
      <div className="flex-1 overflow-y-auto pb-[119px]"> 
        
        {/* === 상단 뷰: 조건부 렌더링 === */}
        {viewMode === 'initial' ? (
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
        ) : (
          <div className="pt-20 px-5"> 
            {/* AI 리뷰 결과 박스 */}
            <div 
              style={{
                width: 340,
                minHeight: 79, 
                borderRadius: 18,
                border: '1px solid #7AE7FF',
                padding: 10,
                overflowY: 'auto',
                margin: '0 auto',
                whiteSpace: 'pre-wrap',
                fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '150%',
                letterSpacing: '0px',
                background: '#FFFFFF', 
                color: '#12121E',
              }}
            >
              {generatedReview}
            </div>

            {/* 버튼 그룹 */}
            <div 
              className="flex justify-between mt-4" 
              style={{
                width: 340, 
                margin: '14px auto 0 auto',
              }}
            >
              {/* 복사/저장/공유를 묶는 그룹 (12px 간격) */}
              <div className="flex" style={{ gap: 12 }}>
                
                {/* 복사 버튼 */}
                <button
                  onClick={handleCopyClick}
                  style={{
                    width: 65, height: 37, borderRadius: 23,
                    cursor: 'pointer',
                    fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: '150%',
                    background: '#E6FCFF',
                    color: '#00A0E0', 
                    border: 'none',
                  }}
                >
                  복사
                </button>

                {/* 저장 버튼 */}
                <button
                  onClick={() => alert('저장 기능 구현 예정')}
                  style={{
                    width: 65, height: 37, borderRadius: 23,
                    cursor: 'pointer',
                    fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: '150%',
                    background: '#FFFFFF',
                    color: '#00A0E0', 
                    border: '1px solid #00A0E0',
                  }}
                >
                  저장
                </button>

                {/* 공유 버튼 */}
                <button
                  onClick={() => alert('공유 기능 구현 예정')}
                  style={{
                    width: 65, height: 37, borderRadius: 23,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', 
                    justifyContent: 'center',
                    gap: 4,
                    fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: '150%',
                    background: '#E6FCFF',
                    color: '#00A0E0', 
                    border: 'none',
                  }}
                >
                  <Image
                    src="/assets/icons/share.svg"
                    width={16} 
                    height={16}
                    alt="공유"
                  />
                  공유
                </button>
              </div>
              
              {/* 초기화 버튼 (오른쪽 정렬됨) */}
              <button
                onClick={handleResetClick}
                style={{
                  width: 65, height: 37, borderRadius: 23,
                  cursor: 'pointer',
                  fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: '150%',
                  background: '#A9A9B0',
                  color: 'white', 
                  border: 'none',
                }}
              >
                초기화
              </button>
            </div>
          </div>
        )}
      </div>
      {/* --- 스크롤 영역 --- */}
      
      {/* --- 하단 고정 프롬포트창 --- */}
      <div className="w-full rounded-t-3xl border-t border-blue-light-200 bg-background p-6 shadow-[0px_4px_15px_blue-light-200] flex flex-col justify-between h-[65vh] flex-shrink-0 relative">
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onFocus={() => setKeyboardOpen(true)} // BottomNav 숨기기 신호
          onBlur={() => setKeyboardOpen(false)}  // BottomNav 보이기 신호
          placeholder={
            viewMode === 'result'
              ? "추가 코멘트를 입력해주세요"
              : "강남역, 분위기 좋은, 산미가 있는 커피"
          }
          rows={2}
          className="w-full resize-none border-none bg-transparent p-2 text-caption text-gray-6 placeholder-gray-4 focus:outline-none focus:ring-0 dark:text-gray-3 dark:placeholder-gray-4"
        />

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
        {/* ---  버튼 컨테이너 --- */}
          
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
      {/* --- 하단 고정 영역 --- */}

    </div>
  );
}