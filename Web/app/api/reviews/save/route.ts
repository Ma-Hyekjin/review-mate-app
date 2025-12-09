// app/api/reviews/save/route.ts
// 리뷰 저장 API

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { logError } from '@/lib/logger';
import { requireAuth } from '@/lib/auth-helpers';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * 리뷰 저장 API (POST /api/reviews/save)
 */
export async function POST(req: Request) {
  try {
    // 1. 사용자 인증: 세션 정보 확인
    const { userId } = await requireAuth();

    // 2. 요청 데이터 추출 및 검증
    const body = await req.json();
    const { content, mateId } = body;

    if (!content || !mateId) {
      return errorResponse('필수 데이터(content, mateId)가 누락되었습니다.', 400);
    }

    // 3. 메이트 존재 여부 확인
    const mate = await db.mate.findFirst({
      where: {
        id: mateId,
        userId: userId, // 사용자의 메이트인지 확인
      },
    });

    if (!mate) {
      return errorResponse('메이트를 찾을 수 없습니다.', 404);
    }

    // 4. DB 저장: 새로운 SavedReview 생성
    const savedReview = await db.savedReview.create({
      data: {
        content: content,
        userId: userId,
        mateId: mateId,
      },
    });

    // 5. 성공 응답
    return successResponse(
      { id: savedReview.id },
      '리뷰가 저장되었습니다.',
      201
    );
  } catch (error) {
    // requireAuth에서 throw한 에러는 그대로 전달
    if (error instanceof NextResponse) {
      return error;
    }
    logError('리뷰 저장 실패', error);
    return errorResponse('리뷰 저장 중 서버 오류가 발생했습니다.', 500);
  }
}

