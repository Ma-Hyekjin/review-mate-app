// components/features/main/MainResultView.tsx
import React from 'react';
import Image from 'next/image';

interface MainResultViewProps {
  generatedReview: string;
  handleCopyClick: () => void;
  handleSaveClick: () => void;
  handleShareClick: () => void;
  handleResetClick: () => void;
  isSaving?: boolean;
  isSaveDisabled?: boolean;
}

export default function MainResultView({
  generatedReview,
  handleCopyClick,
  handleSaveClick,
  handleShareClick,
  handleResetClick,
  isSaving = false,
  isSaveDisabled = false,
}: MainResultViewProps) {
  return (
    <div className="pt-20 px-5 relative" style={{ minHeight: 'calc(100vh - 65vh - 80px)' }}> 
      {/* AI 리뷰 결과 박스 - 6줄 고정, 스크롤 가능 (텍스트만 스크롤) */}
      <div 
        style={{
          width: 340,
          height: 146, // 6줄 고정: (14px * 1.5 lineHeight * 6줄) + (10px padding * 2) = 126 + 20 = 146px
          maxHeight: 146,
          borderRadius: 18,
          border: '1px solid #7AE7FF',
          padding: 10,
          overflowY: 'auto',
          overflowX: 'hidden',
          margin: '0 auto',
          whiteSpace: 'pre-wrap',
          fontFamily: '"Spoqa Han Sans Neo", sans-serif',
          fontWeight: 400,
          fontSize: 14,
          lineHeight: '150%',
          letterSpacing: '0px',
          background: '#FFFFFF', 
          color: '#12121E',
          wordBreak: 'break-word',
        }}
      >
        {generatedReview}
      </div>

      {/* 버튼 그룹 - 고정 위치 (텍스트 박스 아래 고정) */}
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
            onClick={handleSaveClick}
            disabled={isSaveDisabled || isSaving}
            style={{
              width: 65, height: 37, borderRadius: 23,
              cursor: isSaveDisabled || isSaving ? 'not-allowed' : 'pointer',
              fontFamily: '"Spoqa Han Sans Neo", sans-serif',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '150%',
              background: isSaveDisabled ? '#F5F5F5' : '#FFFFFF',
              color: isSaveDisabled ? '#A9A9B0' : '#00A0E0', 
              border: `1px solid ${isSaveDisabled ? '#E0E0E0' : '#00A0E0'}`,
              opacity: isSaving ? 0.6 : 1,
            }}
          >
            {isSaving ? '저장중...' : '저장'}
          </button>

          {/* 공유 버튼 */}
          <button
            onClick={handleShareClick}
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