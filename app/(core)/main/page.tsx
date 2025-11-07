// app/(core)/main/page.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useUiStore } from "@/stores/uiStore";
interface SelectedImage {
  file: File;
  previewUrl: string;
}

export default function MainPage() {
  const [inputText, setInputText] = useState("");
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setKeyboardOpen, isKeyboardOpen } = useUiStore();

  // 'initial': 초기 환영 메시지 화면
  // 'result': AI 결과 박스 + 버튼 화면
  const [viewMode, setViewMode] = useState<'initial' | 'result'>('initial');
  
  // AI가 생성한 리뷰 텍스트를 저장할 상태
  const [generatedReview, setGeneratedReview] = useState("");

  


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * '생성하기' / '재생성하기' 버튼 클릭 시 실행
   * (현재: 더미 데이터로 프론트엔드 UI 테스트)
   */
  const handleGenerateClick = async () => {
    // 1. 입력값이 없으면 실행 방지
    if (inputText.trim() === "" || isLoading) {
      if (!isLoading) alert("생성할 키워드를 입력해주세요!");
      return; 
    }

    // 2. 로딩 시작
    setIsLoading(true); 

    // 3. '더미 데이터'를 사용한 프론트엔드 테스트 로직
    // (1초간 '생성 중...'을 보여주기 위한 가짜 지연)
    setTimeout(() => {
      // 3-1. AI가 생성했다고 가정한 더미 텍스트
      setGeneratedReview(
        "AI가 생성한 더미 리뷰입니다.\n" +
        `입력된 키워드: ${inputText}\n` +
        "이 식당은 정말 멋진 분위기와 맛있는 커피를 제공합니다. [장소: 강남역 스타벅스]"
      );
      
      // 3-2. '결과' 뷰 모드로 전환
      setViewMode('result');

      // 기존 입력창의 텍스트를 비웁니다.
      setInputText("");
      
      // 3-3. 로딩 종료
      setIsLoading(false);
    }, 1000); 
  };

  /**
   * '복사' 버튼 클릭 시 실행
   */
  const handleCopyClick = () => {
    if (!generatedReview) return; // 복사할 내용이 없으면 중단

    navigator.clipboard.writeText(generatedReview)
      .then(() => {
        alert('리뷰가 클립보드에 복사되었습니다!');
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
        alert('복사에 실패했습니다.');
      });
  };

  /**
   * '초기화' 버튼 클릭 시 실행
   */
  const handleResetClick = () => {
    // 모든 state를 초기 상태로 되돌립니다.
    setInputText("");
    setSelectedImages([]);
    setGeneratedReview("");
    setViewMode('initial'); // '초기' 뷰로 전환
  };


  return (
    <>
      <div className="flex min-h-[calc(100vh-8.5rem)] flex-col justify-between w-full">
        
        {/* === 상단 뷰: 조건부 렌더링 === */}
        {viewMode === 'initial' ? (
          // 1. 'initial' 상태일 때 (기존 환영 메시지)
          <div className="flex flex-col items-center gap-20 pt-20 text-center">
            <h1 className="text-title-md font-bold">
              <span className="bg-gradient-light bg-clip-text text-transparent">
                만나서 반가워요!
              </span>
            </h1>
            <p className="text-caption text-gray-5">
              리뷰메이트와 함께하는 리뷰 생활 시작해봐요!
            </p>
          </div>
        ) : (
          // 2. 'result' 상태일 때 (새로운 결과 UI)
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
                // --- (여기가 요청하신 스타일입니다) ---
                fontFamily: '"Spoqa Han Sans Neo", sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '150%',
                letterSpacing: '0px',
                background: '#FFFFFF', 
                color: '#12121E', // var(--gery10)
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
                    gap: 0, // (아이콘과 텍스트 간격)
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
                    width={26} 
                    height={26}
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
                  background: '#A9A9B0', // var(--gery5)
                  color: 'white', 
                  border: 'none',
                }}
              >
                초기화
              </button>
            </div>
          </div>
        )}
        {/* === 여기까지 조건부 렌더링 === */}


        {/*프롬포트 입력창 */}
        <div className={`w-full rounded-t-3xl border-t border-blue-light-200 bg-background p-6 shadow-[0px_4px_15px_blue-light-200] flex flex-col justify-between ${isKeyboardOpen ? 'h-[50vh]' : 'h-[40vh]'}`}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => setKeyboardOpen(true)} // 키보드 열림
            onBlur={() => setKeyboardOpen(false)}  // 키보드 닫힘
            placeholder={
              viewMode === 'result'
                ? "추가 코멘트를 입력해주세요"
                : "강남역, 분위기 좋은, 산미가 있는 커피"
            }
            rows={5}
            className="w-full resize-none border-none bg-transparent p-2 text-caption text-gray-6 placeholder-gray-4 focus:outline-none focus:ring-0 dark:text-gray-3 dark:placeholder-gray-4 flex-grow"
          />
          {selectedImages.length > 0 && (
            <div className="my-2 flex space-x-2 overflow-x-auto p-1">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative shrink-0">
                  <Image
                    src={image.previewUrl}
                    alt={`preview ${index}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -right-1 -top-1 rounded-full bg-white text-gray-700"
                  >
                    <svg xmlns="http://www.w_3_org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5_354 4_646a_5_5 0 1 0-_708_708L7_293 8l-2_647 2_646a_5_5 0 0 0 _708_708L8 8_707l2_646 2_647a_5_5 0 0 0 _708-_708L8_707 8l2_647-2_646a_5_5 0 0 0-_708-_708L8 7_293 5_354 4_646z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="relative mt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`absolute left-[20px] flex h-[50px] w-[108px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-background text-caption font-medium text-gray-3 transition hover:bg-blue-light-100 ${isKeyboardOpen ? 'bottom-[30px]' : 'bottom-[100px]'}`}
            >
              <Image
                src="/assets/icons/camera.svg"
                width={22}
                height={18}
                alt="사진첨부"
              />
              사진첨부
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            {/* '생성하기' 버튼 */}
            <button
              onClick={handleGenerateClick}
              disabled={isLoading}
              className="absolute bottom-[30px] right-[20px] flex h-[50px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-blue-light-100 text-caption font-medium text-primary-light transition hover:bg-blue-light-200 disabled:opacity-70 disabled:bg-gray-2"
              // width를 state에 따라 동적으로 변경
              style={{
                width: viewMode === 'result' ? 121 : 110,
              }}
            >
              <Image
                src="/assets/icons/generate.svg"
                width={20}
                height={20}
                alt={viewMode === 'result' ? '재생성하기' : '생성하기'}
              />
              {/* 텍스트도 state에 따라 동적으로 변경 */}
              {isLoading ? '생성 중...' : (viewMode === 'result' ? '재생성하기' : '생성하기')}
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}