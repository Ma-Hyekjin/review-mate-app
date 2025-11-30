// hooks/useMate.ts
// 메이트 정보 조회 관련 커스텀 훅

import { useState, useEffect, useCallback } from "react";
import { API_ENDPOINTS } from "@/constants";
import { logError } from "@/lib/logger";
import { apiClient } from "@/lib/api-client";
import type { GetMatesResponse, ApiResponse } from "@/types/api";

export interface Mate {
  id: string;
  name: string;
  personaJson: string;
  isDefault?: boolean; // 기본 제공 메이트 여부
  createdAt: string;
  updatedAt: string;
}

interface UseMateOptions {
  onError?: (error: Error) => void;
}

/**
 * 메이트 정보 조회 커스텀 훅
 */
export function useMate(options?: UseMateOptions) {
  const [mates, setMates] = useState<Mate[]>([]);
  const [currentMate, setCurrentMate] = useState<Mate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 메이트 목록 조회
   */
  const fetchMates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<ApiResponse<GetMatesResponse>>(API_ENDPOINTS.MATE);
      const data = response.data || [];
      setMates(data);

      // 기본 메이트가 있으면 기본 메이트를, 없으면 첫 번째 메이트를 선택
      if (data.length > 0) {
        const defaultMate = data.find(mate => mate.isDefault);
        setCurrentMate(defaultMate || data[0]);
      } else {
        setCurrentMate(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error("메이트 조회에 실패했습니다.");
      setError(errorMessage);
      options?.onError?.(errorMessage);
      logError("메이트 조회 오류", err);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  /**
   * 현재 메이트 변경
   */
  const setMate = useCallback((mateId: string) => {
    const mate = mates.find((m) => m.id === mateId);
    if (mate) {
      setCurrentMate(mate);
    }
  }, [mates]);

  // 컴포넌트 마운트 시 메이트 목록 조회
  useEffect(() => {
    fetchMates();
  }, [fetchMates]);

  return {
    mates,
    currentMate,
    isLoading,
    error,
    hasMate: mates.length > 0,
    fetchMates,
    setMate,
  };
}

