// types/api.ts
// API 응답 타입 정의

import type { Mate } from "@/hooks/useMate";

/**
 * 공통 API 응답 형식
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * 공통 API 에러 응답 형식
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
}

/**
 * 리뷰 생성 API 응답
 */
export interface GenerateReviewResponse {
  review: string;
}

/**
 * 리뷰 생성 API 요청
 */
export interface GenerateReviewRequest {
  inputText: string;
  mateId?: string; // 선택적: 특정 메이트 사용 시
}

/**
 * 메이트 생성 API 요청
 */
export interface CreateMateRequest {
  name: string;
  personaJson: string;
}

/**
 * 메이트 생성 API 응답
 */
export type CreateMateResponse = Mate;

/**
 * 메이트 목록 조회 API 응답
 */
export type GetMatesResponse = Mate[];

/**
 * 리뷰 저장 API 요청
 */
export interface SaveReviewRequest {
  content: string;
  mateId: string;
}

/**
 * 리뷰 저장 API 응답 데이터
 */
export interface SaveReviewResponseData {
  id: string;
}

/**
 * 리뷰 저장 API 응답 (레거시 호환용)
 */
export interface SaveReviewResponse {
  id: string;
  message: string;
}

/**
 * 저장된 리뷰 조회 API 응답
 */
export interface SavedReviewResponse {
  id: string;
  content: string;
  createdAt: string;
  mate: {
    id: string;
    name: string;
    persona: string;
  };
}

/**
 * 저장된 리뷰 목록 조회 API 응답
 */
export type GetSavedReviewsResponse = SavedReviewResponse[];

