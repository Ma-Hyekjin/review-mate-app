// components/main/MainResultView.tsx
import React from 'react';
import Image from 'next/image';

interface MainResultViewProps {
  generatedReview: string;
  handleCopyClick: () => void;
  handleResetClick: () => void;
}

export default function MainResultView({
  generatedReview,
  handleCopyClick,
  handleResetClick,
}: MainResultViewProps) {
  return (
    <div className="pt-20 px-5"> 
      {/* AI 리뷰 결과 박스 */}
      <div 
        style={{
          width: 340,
          minHeight: 79, 
          borderRadius: 18,
          border: '1px solid #7AE7FF',
          padding: 10,
          overflowY: 'auto',
          margin: '0 auto',
          whiteSpace: 'pre-wrap',
          fontFamily: '"Spoqa Han Sans Neo", sans-serif',
          fontWeight: 400,
          fontSize: 14,
          lineHeight: '150%',
          letterSpacing: '0px',
          background: '#FFFFFF', 
          color: '#12121E',
        }}
      >
        {generatedReview}
      </div>

      {/* 버튼 그룹 */}
      <div 
        className="flex justify-between mt-4" 
        style={{
          width: 340, 
          margin: '14px auto 0 auto',
        }}
      >
        {/* 복사/저장/공유를 묶는 그룹 (12px 간격) */}
        <div className="flex" style={{ gap: 12 }}>
          
          {/* 복사 버튼 */}
          <button
            onClick={handleCopyClick}
            style={{
              width: 65, height: 37, borderRadius: 23,
              cursor: 'pointer',
              fontFamily: '"Spoqa Han Sans Neo", sans-serif',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '150%',
              background: '#E6FCFF',
              color: '#00A0E0', 
              border: 'none',
            }}
          >
            복사
          </button>

          {/* 저장 버튼 */}
          <button
            onClick={() => alert('저장 기능 구현 예정')}
            style={{
              width: 65, height: 37, borderRadius: 23,
              cursor: 'pointer',
              fontFamily: '"Spoqa Han Sans Neo", sans-serif',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '150%',
              background: '#FFFFFF',
              color: '#00A0E0', 
              border: '1px solid #00A0E0',
            }}
          >
            저장
          </button>

          {/* 공유 버튼 */}
          <button
            onClick={() => alert('공유 기능 구현 예정')}
            style={{
              width: 65, height: 37, borderRadius: 23,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', 
              justifyContent: 'center',
              gap: 4,
              fontFamily: '"Spoqa Han Sans Neo", sans-serif',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '150%',
              background: '#E6FCFF',
              color: '#00A0E0', 
              border: 'none',
            }}
          >
            <Image
              src="/assets/icons/share.svg"
              width={16} 
              height={16}
              alt="공유"
            />
            공유
          </button>
        </div>
        
        {/* 초기화 버튼 (오른쪽 정렬됨) */}
        <button
          onClick={handleResetClick}
          style={{
            width: 65, height: 37, borderRadius: 23,
            cursor: 'pointer',
            fontFamily: '"Spoqa Han Sans Neo", sans-serif',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '150%',
            background: '#A9A9B0',
            color: 'white', 
            border: 'none',
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}