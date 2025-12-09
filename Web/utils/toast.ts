// utils/toast.ts
// 토스트 알림 유틸리티 함수

import toast from "react-hot-toast";

/**
 * 성공 메시지를 표시한다.
 */
export const showSuccess = (message: string) => {
  toast.success(message);
};

/**
 * 에러 메시지를 표시한다.
 */
export const showError = (message: string) => {
  toast.error(message);
};

/**
 * 정보 메시지를 표시한다.
 */
export const showInfo = (message: string) => {
  toast(message, {
    icon: "ℹ️",
  });
};

/**
 * 로딩 메시지를 표시하고 토스트 ID를 반환한다.
 * 이후 updateLoading 또는 dismissToast로 업데이트/제거할 수 있다.
 */
export const showLoading = (message: string): string => {
  return toast.loading(message);
};

/**
 * 로딩 토스트를 성공 메시지로 업데이트한다.
 */
export const updateLoadingToSuccess = (toastId: string, message: string) => {
  toast.success(message, { id: toastId });
};

/**
 * 로딩 토스트를 에러 메시지로 업데이트한다.
 */
export const updateLoadingToError = (toastId: string, message: string) => {
  toast.error(message, { id: toastId });
};

/**
 * 토스트를 제거한다.
 */
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

/**
 * 모든 토스트를 제거한다.
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};

// 기본 export (기존 alert()와 유사한 사용법을 위해)
export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  loading: showLoading,
  updateToSuccess: updateLoadingToSuccess,
  updateToError: updateLoadingToError,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
};

