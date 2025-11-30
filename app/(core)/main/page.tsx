// app/(core)/main/page.tsx
"use client";

import { useState } from "react";
import MainInitialView from "@/components/features/main/MainInitialView";
import MainResultView from "@/components/features/main/MainResultView";
import MainPromptArea from "@/components/features/main/MainPromptArea";
import SharePopup from "@/components/features/main/SharePopup";
import { useImageUpload, useReview, useClipboard, useMate } from "@/hooks";
import { API_ENDPOINTS } from "@/constants";
import { showError, showSuccess } from "@/utils/toast";
import { logError, logInfo } from "@/lib/logger";
import { apiClient } from "@/lib/api-client";
import type { SaveReviewRequest, SaveReviewResponseData, ApiResponse } from "@/types/api";

export default function MainPage() {
  // 이미지 업로드 관련 훅
  const {
    selectedImages,
    fileInputRef,
    handleImageChange,
    removeImage,
    clearImages,
  } = useImageUpload();

  // 리뷰 생성 관련 훅
  const {
    inputText,
    setInputText,
    generatedReview,
    isLoading,
    viewMode,
    generateReview,
    resetReview,
  } = useReview();

  // 클립보드 관련 훅
  const { copyToClipboard } = useClipboard();

  // 메이트 정보 조회 훅
  const { currentMate, isLoading: isMateLoading, hasMate, error: mateError, fetchMates } = useMate();

  // 저장 상태
  const [isSaving, setIsSaving] = useState(false);
  
  // 공유 팝업 상태
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  // 핸들러 함수들
  const handleGenerateClick = () => {
    generateReview(inputText, currentMate?.id);
  };

  const handleCopyClick = () => {
    copyToClipboard(generatedReview, "리뷰가 클립보드에 복사되었습니다!");
  };

  const handleSaveClick = async () => {
    if (!generatedReview.trim()) {
      showError("저장할 리뷰가 없습니다.");
      return;
    }

    if (!currentMate) {
      showError("메이트가 없습니다. 먼저 메이트를 생성해주세요.");
      return;
    }

    setIsSaving(true);

    try {
      await apiClient.post<ApiResponse<SaveReviewResponseData>>(
        API_ENDPOINTS.REVIEWS_SAVE,
        {
          content: generatedReview,
          mateId: currentMate.id,
        } as SaveReviewRequest
      );

      showSuccess("리뷰가 저장되었습니다!");
    } catch (error) {
      logError("리뷰 저장 오류", error);
      
      const errorMessage = error instanceof Error ? error.message : "리뷰 저장에 실패했습니다.";
      showError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareClick = () => {
    if (!generatedReview.trim()) {
      showError("공유할 리뷰가 없습니다.");
      return;
    }
    // 공유 팝업 열기
    setIsSharePopupOpen(true);
  };

  const handlePlatformClick = async (platform: string) => {
    // 먼저 클립보드에 복사
    await copyToClipboard(generatedReview, "");
    
    // 플랫폼별 처리 (나중에 구현)
    // 현재는 클립보드 복사만 수행
    showSuccess("리뷰가 클립보드에 복사되었습니다!");
    setIsSharePopupOpen(false);
    
    // TODO: 플랫폼별 링크 열기 또는 딥링크 처리
    logInfo(`플랫폼 공유: ${platform}`);
  };

  const handleResetClick = () => {
    clearImages();
    resetReview();
  };


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
      
      {/* --- 컨텐츠 영역 (스크롤 없음, 텍스트 박스 내부만 스크롤) --- */}
      <div className="flex-1 overflow-hidden pb-[119px]"> 
        
        {/* 메이트 에러 알림 */}
        {mateError && !isMateLoading && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <p className="font-medium">메이트 정보를 불러올 수 없습니다.</p>
            <p className="mt-1 text-xs">{mateError.message}</p>
            <button
              onClick={fetchMates}
              className="mt-2 text-xs underline hover:no-underline"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* === 상단 뷰: 조건부 렌더링 === */}
        {viewMode === 'initial' ? (
          <MainInitialView />
        ) : (
          <MainResultView
            generatedReview={generatedReview}
            handleCopyClick={handleCopyClick}
            handleSaveClick={handleSaveClick}
            handleShareClick={handleShareClick}
            handleResetClick={handleResetClick}
            isSaving={isSaving}
            isSaveDisabled={!hasMate || !currentMate || isMateLoading}
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

      {/* 공유 팝업 */}
      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
        onPlatformClick={handlePlatformClick}
      />

    </div>
  );
}