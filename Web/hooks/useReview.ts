// hooks/useReview.ts
// 리뷰 생성 및 관리 관련 커스텀 훅

import { useState, useCallback } from "react";
import type { ViewMode } from "@/types";
import { API_ENDPOINTS } from "@/constants";
import { showError, showSuccess } from "@/utils/toast";
import { logError } from "@/lib/logger";
import { apiClient } from "@/lib/api-client";
import type { GenerateReviewResponse, GenerateReviewRequest, ApiResponse } from "@/types/api";

interface UseReviewOptions {
  onSuccess?: (review: string) => void;
  onError?: (error: Error) => void;
}

/**
 * 리뷰 생성 및 관리 커스텀 훅
 */
export function useReview(options?: UseReviewOptions) {
  const [inputText, setInputText] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("initial");

  /**
   * 리뷰 생성
   */
  const generateReview = useCallback(async (keywords: string, mateId?: string) => {
    if (!keywords.trim() || isLoading) {
      if (!isLoading) {
        showError("생성할 키워드를 입력해주세요!");
      }
      return;
    }

    setIsLoading(true);

    try {
      const requestData: GenerateReviewRequest = {
        inputText: keywords,
        ...(mateId && { mateId }), // mateId가 있으면 포함
      };

      const response = await apiClient.post<ApiResponse<GenerateReviewResponse>>(
        API_ENDPOINTS.GENERATE,
        requestData
      );

      const review = response.data?.review || "";

      if (!review) {
        throw new Error("생성된 리뷰가 없습니다.");
      }

      setGeneratedReview(review);
      setViewMode("result");
      options?.onSuccess?.(review);
    } catch (error) {
      logError("리뷰 생성 오류", error);
      
      // ApiClientError 처리
      if (error instanceof Error) {
        const errorMessage = error.message || "리뷰 생성에 실패했습니다.";
        options?.onError?.(error);
        showError(errorMessage);
      } else {
        const unknownError = new Error("리뷰 생성에 실패했습니다.");
        options?.onError?.(unknownError);
        showError("리뷰 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, options]);

  /**
   * 리뷰 복사
   */
  const copyReview = useCallback(async () => {
    if (!generatedReview) return;

    try {
      await navigator.clipboard.writeText(generatedReview);
      showSuccess("리뷰가 클립보드에 복사되었습니다!");
    } catch (error) {
      logError("클립보드 복사 실패", error);
      showError("복사에 실패했습니다.");
    }
  }, [generatedReview]);

  /**
   * 리뷰 초기화
   */
  const resetReview = useCallback(() => {
    setInputText("");
    setGeneratedReview("");
    setViewMode("initial");
  }, []);

  return {
    inputText,
    setInputText,
    generatedReview,
    isLoading,
    viewMode,
    setViewMode,
    generateReview,
    copyReview,
    resetReview,
  };
}

