// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { openai, OPENAI_CONFIG } from '@/lib/openai';
import { getExamplesByKeywords } from '@/constants/reviewExamples';
import db from '@/lib/db';
import { logError } from '@/lib/logger';
import { requireAuth } from '@/lib/auth-helpers';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * 리뷰 생성 API (Few-shot Learning + 페르소나 적용)
 * 
 * 사용자의 짧은 키워드를 받아서 양질의 리뷰로 확장합니다.
 * 카테고리별 예시를 동적으로 선택하여 프롬프트에 포함하고,
 * 사용자의 메이트(페르소나) 정보를 프롬프트에 주입합니다.
 */
export async function POST(request: Request) {
  try {
    // 1. 사용자 인증 확인
    const { userId } = await requireAuth();

    // 2. 요청 데이터 추출
    const { inputText, mateId } = await request.json();

    if (!inputText || typeof inputText !== 'string' || !inputText.trim()) {
      return errorResponse('키워드를 입력해주세요.', 400);
    }

    // 3. 메이트 정보 조회 (mateId가 있으면 해당 메이트, 없으면 기본 메이트)
    let mate = null;
    if (mateId) {
      mate = await db.mate.findFirst({
        where: {
          id: mateId,
          userId: userId,
        },
      });
    }
    
    // 메이트를 찾지 못했거나 mateId가 없으면 기본 메이트 조회
    if (!mate) {
      mate = await db.mate.findFirst({
        where: {
          userId: userId,
          isDefault: true,
        },
      });
    }

    // 4. 페르소나 정보 파싱
    let personaInfo = null;
    if (mate) {
      try {
        personaInfo = JSON.parse(mate.personaJson);
      } catch (error) {
        logError("페르소나 JSON 파싱 실패", error);
      }
    }

    // 5. 키워드 기반으로 관련 예시 선택 (Few-shot Learning)
    const examples = getExamplesByKeywords(inputText, 3);
    
    // 6. 예시를 프롬프트 형식으로 변환
    const examplesText = examples
      .map((ex, idx) => {
        return `예시 ${idx + 1}:
키워드: ${ex.keywords?.join(', ') || '없음'}
리뷰: ${ex.review}`;
      })
      .join('\n\n');

    // 7. 페르소나 정보를 프롬프트에 주입
    let personaPrompt = "";
    if (personaInfo) {
      const personalityTraits = Object.entries(personaInfo.personality || {})
        .filter(([_, value]) => value)
        .map(([_, value]) => value)
        .join(", ");

      personaPrompt = `
**사용자 페르소나 정보:**
- 성별: ${personaInfo.gender || "미지정"}
- 나이: ${personaInfo.age || "미지정"}
- 성향: ${personalityTraits || "미지정"}
${personaInfo.details && personaInfo.details.length > 0 ? `
- 사용자의 과거 리뷰 스타일 예시:
${personaInfo.details.slice(0, 3).map((detail: string, idx: number) => `  ${idx + 1}. ${detail}`).join('\n')}
` : ""}

위 페르소나 정보를 바탕으로 사용자의 고유한 문체와 톤을 반영하여 리뷰를 작성해주세요.`;
    }

    // 8. 시스템 프롬프트 구성
    const systemPrompt = `당신은 리뷰 작성 전문가입니다. 사용자의 짧은 메모나 키워드를 바탕으로 자연스럽고 매력적인 리뷰를 작성해주세요.
${personaPrompt}

다음은 참고할 예시입니다:
${examplesText}

**작성 가이드라인:**
- 사용자의 키워드를 자연스럽게 확장하여 완성된 리뷰로 작성
- 예시와 비슷한 톤과 스타일 유지
${personaInfo ? "- 사용자의 페르소나 정보(성별, 나이, 성향, 과거 리뷰 스타일)를 반영하여 '나다운' 문체로 작성" : ""}
- 구체적이고 생생한 표현 사용
- 100-200자 정도의 적절한 길이
- 긍정적이면서도 솔직한 톤
- 한국어로 작성`;

    // 9. 사용자 프롬프트
    const userPrompt = `다음 키워드를 바탕으로 리뷰를 작성해주세요:

키워드: ${inputText}

${personaInfo ? "위 페르소나 정보와 예시를 참고하여" : "위 예시와 같은 스타일로"} 자연스럽고 매력적인 리뷰를 작성해주세요.`;

    // 10. OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.MODEL,
      messages: [
        { 
          role: "system", 
          content: systemPrompt
        },
        { 
          role: "user", 
          content: userPrompt
        }
      ],
      max_tokens: OPENAI_CONFIG.MAX_TOKENS,
      temperature: OPENAI_CONFIG.TEMPERATURE,
    });

    // 11. AI의 응답(리뷰 텍스트)을 추출
    const review = completion.choices[0]?.message?.content;

    if (!review) {
      logError("OpenAI 응답에서 리뷰를 추출할 수 없음", { completion });
      return errorResponse('리뷰 생성에 실패했습니다.', 500);
    }

    // 12. 프론트엔드로 응답 전송
    return successResponse({ review }, '리뷰가 생성되었습니다.');

  } catch (error) {
    // requireAuth에서 throw한 에러는 그대로 전달
    if (error instanceof NextResponse) {
      return error;
    }
    logError("리뷰 생성 API 오류", error);
    return errorResponse('리뷰 생성에 실패했습니다.', 500);
  }
}