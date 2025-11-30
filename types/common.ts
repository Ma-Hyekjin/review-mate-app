// types/common.ts
// 공통 타입 정의

/**
 * 선택된 이미지 정보
 */
export interface SelectedImage {
  file: File;
  previewUrl: string;
}

/**
 * 뷰 모드 타입
 */
export type ViewMode = 'initial' | 'result';

/**
 * Quick Pick 단계 타입
 */
export type QuickPickStep = "gender" | "age" | "personality" | "name" | "confirm" | "details";

