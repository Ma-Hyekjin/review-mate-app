// app/(core)/main/page.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { 
  FaCopy, FaUndo, FaSave, FaCamera, FaTimesCircle, FaSyncAlt 
} from "react-icons/fa";
import { SiNaver, SiKakao, SiGooglemaps } from "react-icons/si";

type ViewState = "initial" | "loading" | "result";

interface SelectedImage {
  file: File;
  previewUrl: string;
}

// TODO: [DB] 이 데이터는 DB에서 사용자의 메이트 목록을 불러와야 합니다.
const userMates = [
  { id: 1, name: "메이트", profileImage: "/mate-image.png" },
  { id: 2, name: "친절한 리뷰어", profileImage: "/user-profile.png" },
  { id: 3, name: "새로운 메이트", profileImage: "/event-banner-1.png" },
];

export default function MainPage() {
  const [inputText, setInputText] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");
  const [view, setView] = useState<ViewState>("initial");
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeMate, setActiveMate] = useState(userMates[0]);
  const [isSwitchingMates, setIsSwitchingMates] = useState(false);
  const [placeName, setPlaceName] = useState("강남 알베르 카페");

  const handleGenerate = () => {
    if (inputText.trim() === "" || view === 'loading') return;
    setView("loading");
    
    console.log("생성할 리뷰 원문:", inputText);
    console.log("첨부된 사진 파일:", selectedImages.map(img => img.file));
    console.log("사용된 메이트:", activeMate.name);

    setTimeout(() => {
      const aiResponse = `와, 강남 알베르 카페 정말 좋았어요! 티라미수가 입에서 살살 녹는 게 예술이더라고요. 아메리카노랑 궁합이 최고였어요. 분위기도 좋고 매장도 넓어서 이야기 나누기 딱 좋았는데, 의자가 조금 불편했던 건 살짝 아쉬워요. 그래도 공부보다는 데이트하러 가기엔 정말 완벽한 곳 같아요! 추천합니다!`;
      setGeneratedReview(aiResponse);
      setPlaceName("강남 알베르 카페"); 
      setView("result");
    }, 1500);

    setInputText("");
    setSelectedImages([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({ file, previewUrl: URL.createObjectURL(file) }));
      setSelectedImages(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => { setSelectedImages(prev => prev.filter((_, i) => i !== index)); };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReview).then(() => {
      alert("리뷰가 복사되었습니다!");
    }).catch(err => {
      console.error("복사 실패:", err);
      alert("복사에 실패했습니다.");
    });
  };

  const handleSave = () => {
    console.log("저장할 리뷰:", generatedReview);
    alert("리뷰가 저장되었습니다!");
  };
  
  const handleReset = () => {
    setView("initial");
    setGeneratedReview("");
    setInputText("");
    setSelectedImages([]);
    setPlaceName("");
  };
  
  const handleSelectMate = (mate: typeof userMates[0]) => {
    setActiveMate(mate);
    setIsSwitchingMates(false);
    console.log(`${mate.name}(으)로 메이트 전환됨`);
  };

  const getNaverMapUrl = (query: string) => `https://map.naver.com/v5/search/${encodeURIComponent(query)}`;
  const getKakaoMapUrl = (query: string) => `https://map.kakao.com/?q=${encodeURIComponent(query)}`;
  const getGoogleMapUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="relative min-h-screen">
      <TopNav />
      <main className="flex min-h-screen flex-col items-center justify-center pt-14 pb-16">
        <div className="w-full max-w-md p-4">
          <div className="flex h-[350px] flex-col items-center justify-center">
            {view === "initial" && (
              <div className="relative flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  <button 
                    onClick={() => setIsSwitchingMates(!isSwitchingMates)} 
                    className="relative block h-40 w-40 overflow-hidden rounded-full border transition-transform hover:scale-105"
                  >
                    <Image src={activeMate.profileImage} alt="메이트 프로필 이미지" layout="fill" objectFit="cover" />
                  </button>
                </div>
                <p className="text-xl font-semibold">{activeMate.name}</p>
                {isSwitchingMates && (
                   <div 
                     className="absolute top-full mt-2 z-20 w-full max-w-xs rounded-lg border bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-black"
                     onClick={(e) => e.stopPropagation()}
                   >
                     {userMates.map(mate => (
                       <button key={mate.id} onClick={() => handleSelectMate(mate)} className="flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-gray-100 dark:hover:bg-gray-800">
                         <div className="relative h-10 w-10 overflow-hidden rounded-full"><Image src={mate.profileImage} alt={mate.name} layout="fill" objectFit="cover" /></div>
                         <span className="font-semibold">{mate.name}</span>
                       </button>
                     ))}
                   </div>
                )}
              </div>
            )}
            {view === "loading" && (<div className="text-center"><p>메이트가 리뷰를 작성 중입니다...</p></div>)}
            {view === "result" && (
              <div className="w-full space-y-4 text-center">
                <div className="h-[250px] overflow-y-auto rounded-lg border bg-gray-50 p-4 text-left text-sm dark:border-gray-700 dark:bg-gray-800"><p>{generatedReview}</p></div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border p-1 dark:border-gray-600">
                    <button onClick={handleCopy} className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition hover:bg-gray-100 dark:hover:bg-gray-800"><FaCopy /><span>복사</span></button>
                    <button onClick={handleSave} className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition hover:bg-gray-100 dark:hover:bg-gray-800"><FaSave /><span>저장</span></button>
                    <button onClick={handleReset} className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition hover:bg-gray-100 dark:hover:bg-gray-800"><FaUndo /><span>초기화</span></button>
                  </div>
                  {placeName && (
                    <div className="flex items-center gap-3">
                      <a href={getNaverMapUrl(placeName)} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#03C75A] text-white transition hover:opacity-75"><SiNaver size={16}/></a>
                      <a href={getKakaoMapUrl(placeName)} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FFCD00] text-black transition hover:opacity-75"><SiKakao size={16}/></a>
                      <a href={getGoogleMapUrl(placeName)} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-black shadow-sm transition hover:opacity-75"><SiGooglemaps size={16}/></a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 w-full space-y-4">
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} placeholder={view === 'result' ? "추가 코멘트를 입력하여 리뷰를 수정할 수 있습니다." : "강남역 카페, 분위기 좋음, 커피는 산미 강함"} rows={4} className="w-full rounded-lg border bg-gray-100 p-4 transition-all focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-white resize-none"/>
            {selectedImages.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto p-1">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative shrink-0">
                    <Image src={image.previewUrl} alt={`preview ${index}`} width={80} height={80} className="h-20 w-20 rounded-md object-cover"/>
                    <button onClick={() => removeImage(index)} className="absolute -top-1 -right-1 rounded-full bg-white text-gray-700"><FaTimesCircle /></button>
                  </div>
                ))}
              </div>
            )}
            <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleImageChange} className="hidden"/>
            <div className="flex items-center gap-4">
              <button onClick={() => fileInputRef.current?.click()} className="rounded-lg border p-4 text-gray-600 transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"><FaCamera size={20} /></button>
              <button onClick={handleGenerate} disabled={inputText.trim() === "" || view === 'loading'} className="w-full rounded-lg bg-black p-4 text-white transition disabled:bg-gray-300 dark:bg-white dark:text-black dark:disabled:bg-gray-600">
                {view === 'loading' ? '생성 중...' : (view === 'result' ? '재생성하기' : '생성하기')}
              </button>
            </div>
          </div>
        </div>
      </main>
      {isSwitchingMates && (<div className="fixed inset-0 z-10 h-full w-full" onClick={() => setIsSwitchingMates(false)}></div>)}
      <BottomNav />
    </div>
  );
}