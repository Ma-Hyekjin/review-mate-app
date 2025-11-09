// app/(core)/main/page.tsx
"use client";

import { useState, useRef } from "react";
// 분리된 컴포넌트들을 import 합니다.
import MainInitialView from "@/components/main/MainInitialView";
import MainResultView from "@/components/main/MainResultView";
import MainPromptArea from "@/components/main/MainPromptArea";

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
  // useUiStore는 PromptArea에서 호출합니다.

  // --- 함수 ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const selectedImage = {
        file,
        previewUrl: URL.createObjectURL(file),
      };
      setSelectedImages([selectedImage]);
    }
    if (e.target.files) e.target.value = ''; 
  };

  // [수정] 인덱스를 받는 원래 함수 로직을 유지합니다.
  const removeImage = (index: number) => { 
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateClick = async () => {
    if (inputText.trim() === "" || isLoading) {
      if (!isLoading) alert("생성할 키워드를 입력해주세요!");
      return; 
    }
    setIsLoading(true); 
    
    // (더미 데이터 유지)
    setTimeout(() => {
      setGeneratedReview(
        "AI가 생성한 더미 리뷰입니다.\n" + `입력된 키워드: ${inputText}`
      );
      setViewMode('result');
      setIsLoading(false);
    }, 1000); 
  };

  const handleCopyClick = () => {
    if (!generatedReview) return; 
    navigator.clipboard.writeText(generatedReview)
      .then(() => alert('리뷰가 클립보드에 복사되었습니다!'))
      .catch(error => {
        console.error("클립보드 복사 실패:", error); 
        alert('복사에 실패했습니다.');
      });
  };

  const handleResetClick = () => {
    setInputText("");
    setSelectedImages([]);
    setGeneratedReview("");
    setViewMode('initial'); 
  };
  // --- 함수 끝 ---


  return (
    <div className="flex flex-col w-full h-screen">

      {/* --- 파일 입력 필드 --- */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      
      {/* --- 스크롤되는 컨텐츠 영역 --- */}
      <div className="flex-1 overflow-y-auto pb-[119px]"> 
        
        {/* === 상단 뷰: 조건부 렌더링 === */}
        {viewMode === 'initial' ? (
          <MainInitialView />
        ) : (
          <MainResultView
            generatedReview={generatedReview}
            handleCopyClick={handleCopyClick}
            handleResetClick={handleResetClick}
          />
        )}
      </div>
      
      {/* --- 하단 고정 프롬포트창 --- */}
      <MainPromptArea 
        inputText={inputText}
        setInputText={setInputText}
        selectedImages={selectedImages}
        removeImage={removeImage} // 인덱스를 받는 함수를 그대로 전달
        fileInputRef={fileInputRef}
        handleImageChange={handleImageChange}
        handleGenerateClick={handleGenerateClick}
        viewMode={viewMode}
        isLoading={isLoading}
      />

    </div>
  );
}