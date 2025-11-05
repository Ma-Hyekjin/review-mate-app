import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// 1. .env.local에서 API 키를 읽어 OpenAI 클라이언트를 초기화합니다.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 2. POST 요청 핸들러
export async function POST(request: Request) {
  try {
    // 3. 프론트엔드에서 보낸 'inputText'를 추출합니다.
    // (나중에 RAG/Few-shot을 위해 'details' 등도 여기서 받으면 됩니다.)
    const { inputText } = await request.json();

    if (!inputText) {
      return NextResponse.json({ error: 'Input text is required' }, { status: 400 });
    }

    // 4. OpenAI API (gpt-4o) 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // 👈 우리가 선택한 gpt-4o 모델!
      messages: [
        { 
          role: "system", 
          content: "You are a creative review writing assistant. Based on the user's keywords, write a natural and engaging review in Korean." 
        },
        { 
          role: "user", 
          content: inputText // 👈 프론트에서 받은 키워드
        }
      ],
      max_tokens: 500, // 약 200~250 단어 출력 (계산에 맞게 조절 가능)
    });

    // 5. AI의 응답(리뷰 텍스트)을 추출
    const review = completion.choices[0].message.content;

    // 6. 프론트엔드로 { review: "..." } 형태의 JSON 응답 전송
    return NextResponse.json({ review: review });

  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json({ error: 'Failed to generate review' }, { status: 500 });
  }
}