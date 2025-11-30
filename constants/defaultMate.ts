// constants/defaultMate.ts
// 기본 제공 메이트 데이터

export interface DefaultPersona {
  gender: string;
  age: string;
  personality: {
    e?: string;
    i?: string;
    s?: string;
    n?: string;
    t?: string;
    f?: string;
    j?: string;
    p?: string;
  };
  details: string[]; // 샘플 리뷰 텍스트들
}

/**
 * 기본 제공 메이트의 페르소나 데이터
 * 
 * 모든 사용자에게 자동으로 제공되는 기본 메이트입니다.
 * 수정 불가이며, [기본] 태그가 표시됩니다.
 */
export const DEFAULT_MATE_PERSONA: DefaultPersona = {
  gender: "중성",
  age: "20대",
  personality: {
    e: "외향적",
    s: "감각적",
    f: "감정적",
    p: "즉흥적",
  },
  details: [
    "이번에 방문한 곳은 정말 인상적이었어요! 분위기도 좋고 직원분들도 친절하셔서 기분 좋게 시간을 보냈습니다.",
    "맛도 좋고 서비스도 훌륭했어요. 특히 디테일한 부분까지 신경 써주셔서 감동받았습니다.",
    "가격 대비 만족도가 높았던 곳이에요. 다음에 또 방문하고 싶은 곳입니다.",
    "친구들과 함께 가기 좋은 곳이었어요. 분위기도 좋고 메뉴도 다양해서 모두 만족했습니다.",
    "처음 방문했는데 기대 이상이었어요! 특히 인테리어가 마음에 들었고, 다음에 또 오고 싶습니다.",
  ],
};

/**
 * 기본 메이트 이름
 */
export const DEFAULT_MATE_NAME = "메이트";

