// app/api/mate/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import db from '@/lib/db'; 
import { authOptions } from '@/lib/authOptions';


// 메이트 생성 API (POST /api/mate)
export async function POST(req: Request) {
    try {
        // 1. 사용자 인증: 세션 정보 확인
        const session = await getServerSession(authOptions); 

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: '인증되지 않은 사용자입니다.' }, { status: 401 });
        }

        const userId = session.user.id; 

        // 2. 데이터 추출 및 검증
        const body = await req.json();
        const { name, personaJson } = body; // name: 메이트 이름, personaJson: 페르소나 정보 JSON 문자열

        if (!name || !personaJson) {
            return NextResponse.json({ message: '필수 데이터(name, personaJson)가 누락되었습니다.' }, { status: 400 });
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
        return NextResponse.json(newMate, { status: 201 });

    } catch (error) {
        console.error('메이트 생성 실패:', error);
        return NextResponse.json({ message: '메이트 생성 중 서버 오류가 발생했습니다.' }, { status: 500 });
    }
}


// 메이트 조회 API (GET /api/mate)
export async function GET(req: Request) {
    try {
        // 1. 사용자 인증: 세션 정보 확인
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: '인증되지 않은 사용자입니다.' }, { status: 401 });
        }
        
        const userId = session.user.id;

        // 2. 사용자의 모든 Mate 정보 조회 (최대 3개 제한은 프론트엔드나 퀵픽 로직에서 처리)
        const mates = await db.mate.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'asc' }, // 생성 순서대로 정렬
        });

        // 3. 성공 응답 (200: OK)
        return NextResponse.json(mates, { status: 200 });

    } catch (error) {
        console.error('메이트 조회 실패:', error);
        return NextResponse.json({ message: '메이트 조회 중 서버 오류가 발생했습니다.' }, { status: 500 });
    }
}