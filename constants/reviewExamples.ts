// constants/reviewExamples.ts
// 리뷰 생성용 예시 데이터

export type ReviewCategory = 'cafe' | 'restaurant' | 'shopping' | 'activity' | 'etc';

export interface ReviewExample {
  category: ReviewCategory;
  keywords?: string[];  // 입력 키워드 예시 (선택적 - 없으면 리뷰에서 자동 추출)
  review: string;       // 완성된 리뷰
  rating?: number;      // 평점 (1-5, 기본값: 5)
  place?: string;       // 장소명 (선택)
}

/**
 * 카테고리별 리뷰 예시 데이터베이스
 * 
 * 사용법:
 * 1. 사용자 입력 키워드로 카테고리 감지
 * 2. 해당 카테고리의 예시 3~5개를 선택
 * 3. 프롬프트에 포함하여 Few-shot Learning 수행
 */
export const REVIEW_EXAMPLES: ReviewExample[] = [
  // 카페 카테고리
  {
    category: 'cafe',
    keywords: ['강남역', '커피', '분위기'],
    review: '강남역 근처 알베르카페 다녀왔는데 커피 맛이 일품이에요. 커피 향 가득한 공간에서 한 잔 마시니 하루 피로가 싹 풀리더라구요. 자리 조금 불편한 건 아쉬웠지만 맛과 친절한 서비스 덕분에 기분 좋게 시간 보냈어요. 다음에도 또 올게요.',
    rating: 5,
    place: '알베르카페'
  },
  {
    category: 'cafe',
    keywords: ['홍대', '티라미수', '데이트'],
    review: '홍대 카페 티라미수 진짜 맛있음. 크림 부드럽고 커피 맛도 진해서 좋았어요. 분위기 로맨틱해서 데이트하기 괜찮은데 웨이팅 좀 있어요. 그래도 기다릴 만해요.',
    rating: 5,
    place: '홍대 카페'
  },
  {
    category: 'cafe',
    keywords: ['에스프레소', '원두', '바리스타'],
    review: '에스프레소 주문했는데 원두 맛이 깊네요. 바리스타가 정성스럽게 내려주시는 모습 보기 좋았고 커피 품질도 괜찮아요. 커피 좋아하시면 한 번 가보세요.',
    rating: 5,
    place: '스페셜티 커피샵'
  },
  
  // 식당 카테고리
  {
    category: 'restaurant',
    keywords: ['맛집', '웨이팅', '맛있음'],
    review: '웨이팅 길었는데 기다릴 만해요. 음식 품질 좋고 메인 요리 맛있었어요. 직원들 친절하고 전체적으로 만족스러웠습니다. 또 올게요.',
    rating: 5,
    place: '인기 맛집'
  },
  {
    category: 'restaurant',
    keywords: ['파스타', '분위기', '데이트'],
    review: '파스타 맛있어요. 면 알 dente 적당하고 소스 진하고 깊은 맛 나요. 분위기 좋아서 데이트하기 괜찮고 와인이랑 같이 먹으니 더 좋았어요.',
    rating: 5,
    place: '이탈리안 레스토랑'
  },
  {
    category: 'restaurant',
    keywords: ['한식', '정성', '집밥'],
    review: '한식 정성스럽게 만든 게 느껴져요. 집밥 같은 정감 있는 맛에 마음이 따뜻해졌어요. 반찬 다양하고 밑반찬까지 잘 나와서 좋았습니다.',
    rating: 5,
    place: '한식당'
  },
  
  // 쇼핑 카테고리
  {
    category: 'shopping',
    keywords: ['옷', '스타일', '품질'],
    review: '옷 스타일 마음에 들어서 여러 벌 샀어요. 품질 좋고 디자인 트렌디해요. 직원들 스타일링 조언 잘 해줘서 도움 됐습니다.',
    rating: 5,
    place: '패션 매장'
  },
  
  // 활동 카테고리
  {
    category: 'activity',
    keywords: ['전시', '감동', '추천'],
    review: '전시 감동적이었어요. 작품 메시지 깊고 전시 구성 잘 되어 있어서 시간 가는 줄 몰랐네요. 주변 사람들한테도 추천하고 싶어요.',
    rating: 5,
    place: '미술관'
  },
  {
    category: 'activity',
    keywords: ['영화', '재미', '추천'],
    review: '영화 재미있었어요. 스토리 탄탄하고 연기력 좋아서 몰입도 높았습니다. 주변 사람들한테도 추천하고 싶네요.',
    rating: 5,
    place: '영화관'
  },
  {
    category: 'activity',
    keywords: ['공연', '감동', '훌륭'],
    review: '공연 훌륭했어요. 무대 연출 화려하고 배우들 연기력 좋아서 감동 받았습니다. 다음 공연도 기대되네요.',
    rating: 5,
    place: '공연장'
  },
  
  // 카페 카테고리 추가
  {
    category: 'cafe',
    keywords: ['스터디', '조용한', '와이파이'],
    review: '스터디하기 좋은 카페예요. 조용하고 와이파이 안정적이어서 집중 잘 됐어요. 콘센트 충분해서 노트북 쓰기 편했습니다.',
    rating: 5,
    place: '스터디 카페'
  },
  {
    category: 'cafe',
    keywords: ['브런치', '맛있는', '분위기'],
    review: '브런치 메뉴 맛있어요. 에그베네딕트 특히 좋았고 분위기 좋아서 여유롭게 식사하기 괜찮았어요. 또 올게요.',
    rating: 5,
    place: '브런치 카페'
  },
  {
    category: 'cafe',
    keywords: ['디저트', '케이크', '맛있음'],
    review: '케이크 맛있어요. 크림 부드럽고 촉촉해서 한 입 먹으면 행복해지는 맛이에요. 커피랑 같이 먹으니 더 좋았습니다.',
    rating: 5,
    place: '디저트 카페'
  },
  {
    category: 'cafe',
    keywords: ['로컬', '특별한', '커피'],
    review: '로컬 원두 사용한 커피 맛 특별해요. 바리스타가 정성스럽게 내려줘서 깊고 풍부한 맛 났어요. 이 지역에서 꼭 가봐야 할 카페입니다.',
    rating: 5,
    place: '로컬 카페'
  },
  
  // 식당 카테고리 추가
  {
    category: 'restaurant',
    keywords: ['고기', '맛집', '추천'],
    review: '고기 맛 훌륭한 맛집이에요. 신선한 재료에 정성스러운 조리로 완벽한 식사 즐겼어요. 친구들이랑 같이 가기 좋은 곳입니다.',
    rating: 5,
    place: '고기집'
  },
  {
    category: 'restaurant',
    keywords: ['해산물', '신선', '맛있음'],
    review: '해산물 신선하고 맛있어요. 회 질 좋아서 만족스러웠고 서비스 친절해서 또 올게요.',
    rating: 5,
    place: '해산물 식당'
  },
  {
    category: 'restaurant',
    keywords: ['분위기', '데이트', '로맨틱'],
    review: '로맨틱한 분위기 데이트 코스로 완벽해요. 조용하고 아늑한 공간에서 맛있는 음식 즐기기 좋았어요. 특별한 날에 추천합니다.',
    rating: 5,
    place: '데이트 레스토랑'
  },
  {
    category: 'restaurant',
    keywords: ['가성비', '맛있음', '추천'],
    review: '가성비 최고 맛집이에요. 가격 대비 음식 질 좋고 양 넉넉해서 만족스러웠어요. 주변 사람들한테 추천하고 싶네요.',
    rating: 5,
    place: '가성비 맛집'
  },
  {
    category: 'restaurant',
    keywords: ['브런치', '맛있는', '분위기'],
    review: '브런치 메뉴 맛있어요. 베이컨이랑 계란 조합 완벽하고 분위기 좋아서 여유롭게 식사하기 괜찮았어요. 주말 브런치로 추천합니다.',
    rating: 5,
    place: '브런치 레스토랑'
  },
  
  // 쇼핑 카테고리 추가
  {
    category: 'shopping',
    keywords: ['신발', '편안함', '스타일'],
    review: '신발 편안하고 스타일 좋아요. 착화감 좋아서 하루 종일 신어도 발 편했어요. 디자인 트렌디해서 여러 색상 사고 싶네요.',
    rating: 5,
    place: '신발 매장'
  },
  {
    category: 'shopping',
    keywords: ['가방', '품질', '디자인'],
    review: '가방 품질 좋고 디자인 세련됐어요. 실용성과 스타일 둘 다 있어서 만족스러웠고 내구성도 좋아 보여요.',
    rating: 5,
    place: '가방 매장'
  },
  {
    category: 'shopping',
    keywords: ['화장품', '효과', '추천'],
    review: '화장품 효과 좋아요. 사용하고 나서 피부 상태 개선된 거 느껴졌고 제품 품질도 괜찮았어요. 주변 사람들한테 추천하고 싶네요.',
    rating: 5,
    place: '화장품 매장'
  },
  {
    category: 'shopping',
    keywords: ['온라인', '빠른배송', '만족'],
    review: '온라인 쇼핑 만족스러웠어요. 배송 빠르고 포장 깔끔했고 제품 품질 기대 이상이었어요. 다음에도 또 이용할게요.',
    rating: 5,
    place: '온라인 쇼핑몰'
  },
  
  // 활동 카테고리 추가
  {
    category: 'activity',
    keywords: ['체험', '재미', '추천'],
    review: '체험 재미있었어요. 직접 만드는 과정 흥미로웠고 결과물 만족스러웠어요. 가족이랑 친구들이랑 같이 가기 좋은 곳입니다.',
    rating: 5,
    place: '체험관'
  },
  {
    category: 'activity',
    keywords: ['콘서트', '감동', '최고'],
    review: '콘서트 감동적이었어요. 무대 연출이랑 공연력 모두 훌륭해서 최고의 시간 보냈어요. 다음 공연도 꼭 가고 싶네요.',
    rating: 5,
    place: '콘서트장'
  },
  {
    category: 'activity',
    keywords: ['액티비티', '재미', '추천'],
    review: '액티비티 재미있었어요. 스릴 넘치는 경험 할 수 있어서 기억에 남을 만한 하루였어요. 친구들이랑 같이 다시 가고 싶네요.',
    rating: 5,
    place: '액티비티 장소'
  },
  
  // 기타 카테고리
  {
    category: 'etc',
    keywords: ['호텔', '편안함', '서비스'],
    review: '호텔 서비스 훌륭했어요. 객실 깔끔하고 편안했고 직원들 친절해서 편안하게 머물 수 있었어요. 다음 여행에도 여기로 올게요.',
    rating: 5,
    place: '호텔'
  },
  {
    category: 'etc',
    keywords: ['병원', '친절', '전문적'],
    review: '병원 진료 전문적이고 친절했어요. 의사 선생님이 상세하게 설명해주셔서 안심할 수 있었어요. 주변 사람들한테도 추천하고 싶네요.',
    rating: 5,
    place: '병원'
  },
  {
    category: 'etc',
    keywords: ['미용실', '스타일', '만족'],
    review: '미용실 스타일 만족스러웠어요. 원하는 스타일 정확하게 해주셔서 좋았고 디자이너 조언도 도움 됐어요.',
    rating: 5,
    place: '미용실'
  },
];

/**
 * 키워드로 카테고리 감지
 */
export function detectCategory(keywords: string): ReviewCategory {
  const lowerKeywords = keywords.toLowerCase();
  
  // 카페 관련 키워드
  if (['커피', '카페', '에스프레소', '라떼', '아메리카노', '원두', '바리스타', '티라미수', '디저트'].some(k => lowerKeywords.includes(k))) {
    return 'cafe';
  }
  
  // 식당 관련 키워드
  if (['맛집', '식당', '레스토랑', '파스타', '한식', '일식', '중식', '양식', '음식', '요리'].some(k => lowerKeywords.includes(k))) {
    return 'restaurant';
  }
  
  // 쇼핑 관련 키워드
  if (['옷', '의류', '패션', '쇼핑', '매장', '브랜드'].some(k => lowerKeywords.includes(k))) {
    return 'shopping';
  }
  
  // 활동 관련 키워드
  if (['전시', '영화', '공연', '콘서트', '체험', '액티비티'].some(k => lowerKeywords.includes(k))) {
    return 'activity';
  }
  
  return 'etc';
}

/**
 * 카테고리별 예시 선택 (콜드스타트 대응)
 * 
 * 전략:
 * 1. 해당 카테고리의 예시가 충분하면 (>= count) 그대로 사용
 * 2. 예시가 부족하면 해당 카테고리 + 유사 카테고리 조합
 * 3. 예시가 전혀 없으면 전체에서 최고 품질 예시 선택
 */
export function getExamplesByCategory(
  category: ReviewCategory,
  count: number = 3
): ReviewExample[] {
  const categoryExamples = REVIEW_EXAMPLES.filter(ex => ex.category === category);
  
  // 케이스 1: 예시가 충분한 경우
  if (categoryExamples.length >= count) {
    const shuffled = [...categoryExamples].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  
  // 케이스 2: 예시가 부족한 경우 (콜드스타트)
  if (categoryExamples.length > 0) {
    // 해당 카테고리 예시 + 유사 카테고리 예시 조합
    const similarCategories = getSimilarCategories(category);
    const similarExamples = REVIEW_EXAMPLES.filter(ex => 
      similarCategories.includes(ex.category)
    );
    
    // 우선순위: 해당 카테고리 > 유사 카테고리
    const combined = [
      ...categoryExamples,
      ...similarExamples.filter(ex => !categoryExamples.includes(ex))
    ];
    
    const shuffled = [...combined].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  
  // 케이스 3: 예시가 전혀 없는 경우 (최악의 콜드스타트)
  // 전체에서 최고 평점 예시 선택
  const topRated = [...REVIEW_EXAMPLES]
    .filter(ex => ex.rating === 5) // 최고 평점만
    .sort(() => Math.random() - 0.5);
  
  if (topRated.length >= count) {
    return topRated.slice(0, count);
  }
  
  // 최후의 수단: 전체에서 랜덤 선택
  return REVIEW_EXAMPLES.slice(0, count);
}

/**
 * 유사 카테고리 매핑 (콜드스타트 대응)
 */
function getSimilarCategories(category: ReviewCategory): ReviewCategory[] {
  const similarityMap: Record<ReviewCategory, ReviewCategory[]> = {
    'cafe': ['restaurant', 'activity'], // 카페는 식당/활동과 유사
    'restaurant': ['cafe', 'activity'], // 식당은 카페/활동과 유사
    'shopping': ['activity', 'etc'],    // 쇼핑은 활동/기타와 유사
    'activity': ['cafe', 'restaurant'], // 활동은 카페/식당과 유사
    'etc': ['shopping', 'activity'],    // 기타는 쇼핑/활동과 유사
  };
  
  return similarityMap[category] || ['cafe', 'restaurant'];
}

/**
 * 키워드 기반 예시 선택
 * 
 * 콜드스타트 대응:
 * - 키워드로 카테고리 감지
 * - 카테고리별 예시 선택 (부족하면 유사 카테고리 포함)
 * - 최소한의 예시는 항상 보장
 * 
 * 키워드 매칭:
 * - 예시에 keywords가 있으면 키워드 유사도로 정렬
 * - keywords가 없으면 카테고리만으로 선택
 */
export function getExamplesByKeywords(keywords: string, count: number = 3): ReviewExample[] {
  const category = detectCategory(keywords);
  let examples = getExamplesByCategory(category, count * 2); // 여유있게 가져오기
  
  // 키워드 유사도 기반 정렬 (keywords가 있는 예시만)
  const keywordLower = keywords.toLowerCase();
  examples = examples.sort((a, b) => {
    if (!a.keywords && !b.keywords) return 0;
    if (!a.keywords) return 1;
    if (!b.keywords) return -1;
    
    // 키워드 매칭 점수 계산
    const scoreA = a.keywords.some(k => keywordLower.includes(k.toLowerCase())) ? 1 : 0;
    const scoreB = b.keywords.some(k => keywordLower.includes(k.toLowerCase())) ? 1 : 0;
    return scoreB - scoreA;
  });
  
  // 상위 count개만 선택
  examples = examples.slice(0, count);
  
  // 디버깅용 로그 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Review Examples] Category: ${category}, Found: ${examples.length} examples`);
  }
  
  return examples;
}

