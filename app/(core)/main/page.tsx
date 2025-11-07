// app/(core)/main/page.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
// 1. (추가) Zustand 스토어 import (경로 확인!)
import { useUiStore } from "../../../stores/uiStore"; 

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

  // 2. (추가) Zustand 훅 연결 (setKeyboardOpen만 필요)
  const { setKeyboardOpen } = useUiStore();

  // --- ⬇️ (기존 함수들) ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
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
  // --- ⬆️ (기존 함수들 끝) ---


  return (
    <> 
      {/* 3. (수정) "flex min-h-[...]"로 전체 화면 높이 사용 */}
      <div className="flex min-h-[calc(100vh-8.5rem)] flex-col justify-between w-full">
        
        {/* === 상단 뷰: 조건부 렌더링 === */}
        {viewMode === 'initial' ? (
          // 'initial' 상태일 때 (기존 환영 메시지)
          <div className="flex flex-col items-center gap-20 pt-20 text-center">
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
          // 'result' 상태일 때 (새로운 결과 UI)
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
        
        {/* --- ⬇️ 4. (수정) "스크롤되는" 프롬포트창 --- */}
        {/* h-[40vh]를 제거하고, flex-grow로 남은 공간을 채웁니다.
          pb-[300px]을 줘서, 하단의 "고정된" 버튼들에 
          내용이 가려지지 않도록 공간을 확보합니다.
        */}
        <div className="w-full rounded-t-3xl border-t border-blue-light-200 bg-background p-6 shadow-[0px_4px_15px_blue-light-200] flex flex-col justify-between flex-grow pb-[300px]">
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            // --- ⬇️ (추가) Zustand 연결 ---
            onFocus={() => setKeyboardOpen(true)} // BottomNav 숨기기 신호
            onBlur={() => setKeyboardOpen(false)}  // BottomNav 보이기 신호
            // --- ⬆️ (여기까지) ---
            placeholder={
              viewMode === 'result'
                ? "추가 코멘트를 입력해주세요"
                : "강남역, 분위기 좋은, 산미가 있는 커피"
            }
            rows={5}
            className="w-full resize-none border-none bg-transparent p-2 text-caption text-gray-6 placeholder-gray-4 focus:outline-none focus:ring-0 dark:text-gray-3 dark:placeholder-gray-4 flex-grow"
          />
          
          {/* 이미지 프리뷰 */}
          {selectedImages.length > 0 && (
            <div className="my-2 flex space-x-2 overflow-x-auto p-1">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative shrink-0">
                  <Image
                    src={image.previewUrl}
                    alt={`preview ${index}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -right-1 -top-1 rounded-full bg-white text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 🚨 버튼 컨테이너를 이 div에서 삭제했습니다! 🚨 */}
          
        </div>
        {/* --- ⬆️ (여기까지가 스크롤되는 영역) --- */}

      </div>

      {/* --- ⬇️ 5. (추가) "Top 기준 고정" 버튼 컨테이너 --- */}
      {/* 이 <div>는 position: fixed 이고 "항상 보입니다". 
        z-20 이라서 z-30인 BottomNav "아래"에 배치됩니다. 
        (키보드 닫혔을 때 BottomNav에 가려지는 문제 발생)
      */}
      <div 
        className="fixed top-0 left-0 right-0 z-20 w-full max-w-md mx-auto pointer-events-none" 
        style={{ height: '812px' }} // 812px 전체 화면 기준
      > 
        <div className="relative w-full h-full">
          
          {/* 사진첨부 버튼 (Figma Top 스펙 적용) */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute flex h-[50px] w-[108px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-background text-caption font-medium text-gray-3 transition hover:bg-blue-light-100 pointer-events-auto"
            style={{
              left: 25,
              top: 503, // 👈 님께서 말씀하신 Top: 503px
            }}
          >
            <Image
              src="/assets/icons/camera.svg"
              width={22}
              height={18}
              alt="사진첨부"
            />
            사진첨부
          </button>
          
          {/* 생성하기 버튼 (Figma Top 스펙 적용) */}
          <button
            onClick={handleGenerateClick}
            disabled={isLoading}
            className="absolute flex h-[50px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-blue-light-100 text-caption font-medium text-primary-light transition hover:bg-blue-light-200 disabled:opacity-70 disabled:bg-gray-2 pointer-events-auto"
            style={{
              right: 16,
              top: 576, // 👈 님께서 말씀하신 Top: 576px
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
      </div>
    </>
  );
}