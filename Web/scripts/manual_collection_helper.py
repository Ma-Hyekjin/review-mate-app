#!/usr/bin/env python3
"""
수동 수집 리뷰를 TypeScript 형식으로 변환하는 도우미 스크립트

사용법:
1. 리뷰 텍스트를 텍스트 파일에 저장 (한 줄에 하나씩)
2. 스크립트 실행: python manual_collection_helper.py
3. TypeScript 코드 생성
"""

import json
import sys
from typing import List, Dict

def extract_keywords_simple(text: str, max_keywords: int = 3) -> List[str]:
    """리뷰 텍스트에서 간단하게 키워드 추출"""
    stop_words = ['이', '가', '을', '를', '에', '의', '은', '는', '와', '과', '도', '로', '으로', 
                  '에서', '정말', '정말로', '너무', '아주', '매우', '좋은', '좋아요', '좋았어요',
                  '맛있', '맛있어요', '맛있었어요', '인상적', '인상적이었어요', '정말', '정말로']
    
    words = text.split()
    keywords = []
    
    for word in words:
        word_clean = word.strip('.,!?()[]{}').strip()
        if (len(word_clean) > 1 and 
            word_clean not in stop_words and 
            word_clean not in keywords and
            len(keywords) < max_keywords):
            keywords.append(word_clean)
    
    return keywords[:max_keywords] if keywords else ['리뷰']

def format_review_for_ts(review_text: str, category: str, rating: int = 5, place: str = '') -> str:
    """리뷰를 TypeScript 형식으로 변환"""
    keywords = extract_keywords_simple(review_text)
    
    # 리뷰 텍스트 이스케이프 처리
    review_escaped = review_text.replace('`', '\\`').replace('${', '\\${')
    
    return f"""  {{
    category: '{category}',
    keywords: {json.dumps(keywords, ensure_ascii=False)},
    review: `{review_escaped}`,
    rating: {rating},
    place: '{place}'
  }},"""

def main():
    """메인 함수"""
    print("=" * 60)
    print("수동 수집 리뷰 → TypeScript 변환 도우미")
    print("=" * 60)
    print("\n사용법:")
    print("1. 리뷰 텍스트를 입력하세요 (한 줄에 하나씩)")
    print("2. 빈 줄 입력 시 종료")
    print("3. TypeScript 코드가 생성됩니다\n")
    
    category = input("카테고리 (cafe/restaurant/shopping/activity/etc) [cafe]: ").strip() or "cafe"
    place = input("장소명 (선택) []: ").strip()
    rating = int(input("평점 (1-5) [5]: ").strip() or "5")
    
    print("\n리뷰 텍스트를 입력하세요 (한 줄에 하나씩, 빈 줄 입력 시 종료):")
    print("-" * 60)
    
    reviews = []
    while True:
        try:
            line = input()
            if not line.strip():
                break
            reviews.append(line.strip())
        except EOFError:
            break
    
    if not reviews:
        print("리뷰가 입력되지 않았습니다.")
        return
    
    print("\n" + "=" * 60)
    print("생성된 TypeScript 코드")
    print("=" * 60 + "\n")
    
    ts_code = ""
    for review_text in reviews:
        ts_code += format_review_for_ts(review_text, category, rating, place) + "\n"
    
    print(ts_code)
    
    # 파일로 저장
    output_file = f'collected_reviews_{category}.ts'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    
    print(f"\n✅ {len(reviews)}개의 리뷰를 변환했습니다.")
    print(f"📄 결과가 '{output_file}' 파일에 저장되었습니다.")
    print(f"\n이 내용을 'constants/reviewExamples.ts' 파일의 REVIEW_EXAMPLES 배열에 추가하세요.")

if __name__ == "__main__":
    main()

