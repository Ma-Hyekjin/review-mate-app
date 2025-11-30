// hooks/useClipboard.ts
// 클립보드 관련 커스텀 훅

import { useCallback } from "react";
import { showSuccess, showError } from "@/utils/toast";
import { logError } from "@/lib/logger";

interface UseClipboardOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * 클립보드 복사 커스텀 훅
 */
export function useClipboard(options?: UseClipboardOptions) {
  /**
   * 텍스트를 클립보드에 복사
   */
  const copyToClipboard = useCallback(async (text: string, successMessage?: string) => {
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      if (successMessage) {
        showSuccess(successMessage);
      }
      options?.onSuccess?.();
    } catch (error) {
      logError("클립보드 복사 실패", error);
      const errorMessage = error instanceof Error ? error : new Error("복사에 실패했습니다.");
      options?.onError?.(errorMessage);
      showError("복사에 실패했습니다.");
    }
  }, [options]);

  return {
    copyToClipboard,
  };
}

