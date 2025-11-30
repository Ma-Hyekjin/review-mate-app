// lib/auth-helpers.ts
// 인증 관련 헬퍼 함수

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { errorResponse } from './api-response';

export interface AuthResult {
  userId: string;
  session: NonNullable<Awaited<ReturnType<typeof getServerSession>>>;
}

/**
 * 인증이 필요한 API에서 사용자 인증 확인
 * @throws 인증 실패 시 NextResponse를 throw (에러 응답)
 */
export async function requireAuth(): Promise<AuthResult> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    // NextResponse를 throw하여 호출하는 곳에서 catch하여 반환
    throw errorResponse('인증되지 않은 사용자입니다.', 401);
  }

  return {
    userId: session.user.id,
    session: session as NonNullable<typeof session>,
  };
}

