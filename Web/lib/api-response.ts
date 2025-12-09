// lib/api-response.ts
// 공통 API 응답 헬퍼 함수

import { NextResponse } from 'next/server';

/**
 * 성공 응답
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse {
  return NextResponse.json(
    {
      data,
      ...(message && { message }),
    },
    { status }
  );
}

/**
 * 에러 응답
 */
export function errorResponse(
  message: string,
  status: number = 400,
  error?: string
): NextResponse {
  return NextResponse.json(
    {
      error: error || message,
      message,
    },
    { status }
  );
}

