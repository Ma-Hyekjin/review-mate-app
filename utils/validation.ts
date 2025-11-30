// utils/validation.ts
// 유효성 검사 유틸리티 함수

/**
 * 메이트 이름 유효성 검사
 * @param name 검사할 이름
 * @returns 유효성 검사 결과
 */
export function validateMateName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim() === '') {
    return { valid: false, error: '이름을 입력해주세요.' };
  }
  
  const nameRegex = /^[a-zA-Z가-힣0-9-_.]{1,}$/;
  if (!nameRegex.test(name.trim())) {
    return {
      valid: false,
      error: "이름은 1글자 이상의 한글, 영문, 숫자 또는 '-', '_', '.'만 사용할 수 있습니다.",
    };
  }
  
  return { valid: true };
}

/**
 * 리뷰 텍스트 유효성 검사
 * @param text 검사할 텍스트
 * @returns 유효성 검사 결과
 */
export function validateReviewText(text: string): { valid: boolean; error?: string } {
  if (!text || text.trim() === '') {
    return { valid: false, error: '리뷰 내용을 입력해주세요.' };
  }
  
  if (text.trim().length < 10) {
    return { valid: false, error: '리뷰는 최소 10자 이상 입력해주세요.' };
  }
  
  return { valid: true };
}

