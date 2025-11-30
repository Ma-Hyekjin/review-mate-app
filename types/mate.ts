// types/mate.ts
// 메이트 관련 타입 정의

/**
 * 사용자 메이트 정보
 */
export interface UserMateInfo {
  name: string;
  persona: string;
  profileImage: string;
  isDefault?: boolean; // 기본 제공 메이트 여부
}

/**
 * 페르소나 정보 (MBTI 등)
 */
export interface Persona {
  gender: string;
  age: string;
  personality: {
    e: string;
    i: string;
    s: string;
    n: string;
    t: string;
    f: string;
    j: string;
    p: string;
  };
}

/**
 * 페르소나 에디터 Props
 */
export interface PersonaEditorProps {
  personaData: Persona;
  onPersonaChange: (field: keyof Omit<Persona, 'personality'>, value: string) => void;
  onPersonalityChange: (type: string, value: string) => void;
}

/**
 * 메이트 목록 아이템
 */
export interface Mate {
  id: number;
  name: string;
  persona: string;
  isDefault?: boolean; // 기본 제공 메이트 여부
}

