// app/api/reviews/route.ts
// 리뷰 조회 API

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { logError } from '@/lib/logger';
import { requireAuth } from '@/lib/auth-helpers';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * 사용자의 저장된 리뷰 목록 조회 API (GET /api/reviews)
 */
export async function GET(req: Request) {
  try {
    // 1. 사용자 인증: 세션 정보 확인
    const { userId } = await requireAuth();

    // 2. URL 파라미터에서 쿼리 옵션 추출
    const { searchParams } = new URL(req.url);
    const mateId = searchParams.get('mateId');
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // 3. DB 조회: 사용자의 저장된 리뷰 목록
    const where = {
      userId: userId,
      ...(mateId && { mateId: mateId }), // mateId가 있으면 필터링
    };

    const savedReviews = await db.savedReview.findMany({
      where,
      include: {
        mate: {
          select: {
            id: true,
            name: true,
            personaJson: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // 최신순 정렬
      },
      take: limit, // 최대 개수 제한
    });

    // 4. 응답 데이터 포맷팅
    const formattedReviews = savedReviews.map((review) => ({
      id: review.id,
      content: review.content,
      createdAt: review.createdAt.toISOString(),
      mate: {
        id: review.mate.id,
        name: review.mate.name,
        persona: review.mate.personaJson,
      },
    }));

    // 5. 성공 응답
    return successResponse(formattedReviews);
  } catch (error) {
    // requireAuth에서 throw한 에러는 그대로 전달
    if (error instanceof NextResponse) {
      return error;
    }
    logError('리뷰 조회 실패', error);
    return errorResponse('리뷰 조회 중 서버 오류가 발생했습니다.', 500);
  }
}

