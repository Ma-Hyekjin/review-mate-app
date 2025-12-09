// lib/openai.ts
// OpenAI 클라이언트 초기화

import OpenAI from 'openai';

/**
 * OpenAI 클라이언트 인스턴스
 * 환경 변수 OPENAI_API_KEY를 사용하여 초기화됩니다.
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * OpenAI 모델 설정
 */
export const OPENAI_CONFIG = {
  MODEL: 'gpt-4o',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
} as const;

