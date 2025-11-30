// app/api/mate/route.ts

import { NextResponse } from 'next/server';
import db from '@/lib/db'; 
import { logError } from '@/lib/logger';
import { requireAuth } from '@/lib/auth-helpers';
import { successResponse, errorResponse } from '@/lib/api-response';


// 메이트 생성 API (POST /api/mate)
export async function POST(req: Request) {
    try {
        // 1. 사용자 인증: 세션 정보 확인
        const { userId } = await requireAuth(); 

        // 2. 데이터 추출 및 검증
        const body = await req.json();
        const { name, personaJson } = body; // name: 메이트 이름, personaJson: 페르소나 정보 JSON 문자열

        if (!name || !personaJson) {
            return errorResponse('필수 데이터(name, personaJson)가 누락되었습니다.', 400);
        }
        
        // 3. DB 저장: 새로운 Mate 생성
        const newMate = await db.mate.create({
            data: {
                name: name,
                personaJson: personaJson,
                userId: userId, // 현재 로그인된 사용자와 연결
            },
        });

        // 4. 성공 응답
        return successResponse(newMate, '메이트가 생성되었습니다.', 201);

    } catch (error) {
        // requireAuth에서 throw한 에러는 그대로 전달
        if (error instanceof NextResponse) {
            return error;
        }
        logError('메이트 생성 실패', error);
        return errorResponse('메이트 생성 중 서버 오류가 발생했습니다.', 500);
    }
}


// 메이트 조회 API (GET /api/mate)
export async function GET() {
    try {
        // 1. 사용자 인증: 세션 정보 확인
        const { userId } = await requireAuth();

        // 2. 사용자의 모든 Mate 정보 조회 (기본 메이트를 먼저, 그 다음 생성 순서대로 정렬)
        const mates = await db.mate.findMany({
          where: { userId: userId },
          orderBy: [
            { isDefault: 'desc' }, // 기본 메이트를 먼저
            { createdAt: 'asc' }, // 그 다음 생성 순서대로
          ],
        });

        // 3. 성공 응답
        return successResponse(mates);

    } catch (error) {
        // requireAuth에서 throw한 에러는 그대로 전달
        if (error instanceof NextResponse) {
            return error;
        }
        logError('메이트 조회 실패', error);
        return errorResponse('메이트 조회 중 서버 오류가 발생했습니다.', 500);
    }
}