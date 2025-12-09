// app/(user)/mypage/switch-mate/[mateId]/MateDetailClientPage.tsx
// 새로 만드는 파일입니다.
"use client";

import { useState } from "react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { FaPlus, FaTrash } from "react-icons/fa";
import type { Persona, PersonaEditorProps } from '@/types/mate';
import { showSuccess } from "@/utils/toast";
import { logInfo } from "@/lib/logger";

// 페르소나 에디터 컴포넌트
function PersonaEditor({ personaData, onPersonaChange, onPersonalityChange }: PersonaEditorProps) {
    const selectedStyle = "bg-black text-white dark:bg-white dark:text-black";
    const personalityPairs = [
      { key: 'e', value: 'E' }, { key: 'i', value: 'I' }, { key: 's', value: 'S' }, { key: 'n', value: 'N' },
      { key: 't', value: 'T' }, { key: 'f', value: 'F' }, { key: 'j', value: 'J' }, { key: 'p', value: 'P' },
    ];
    // MBTI 각 쌍(예: E/I)에 대한 핸들러
    const handlePairChange = (key1: string, value1: string, key2: string) => {
        const currentPersonality = personaData.personality;
        const key1_ = key1 as keyof typeof currentPersonality;
        const key2_ = key2 as keyof typeof currentPersonality;
        
        // 이미 선택된 버튼을 다시 누르면 선택 해제
        if (currentPersonality[key1_]) {
            onPersonalityChange(key1_, "");
        } else {
            // 다른 버튼을 누르면 반대쪽은 해제하고 새로 선택
            onPersonalityChange(key1_, value1);
            onPersonalityChange(key2_, "");
        }
    };

    return (
      <div className="space-y-4 rounded-lg border p-4 dark:border-gray-700">
        <div>
          <label className="text-sm font-semibold">성별</label>
          <div className="mt-2 flex gap-2">
            <button onClick={() => onPersonaChange('gender', '남성')} className={`flex-1 rounded-md border p-2 ${personaData.gender === '남성' ? selectedStyle : ''}`}>남성</button>
            <button onClick={() => onPersonaChange('gender', '여성')} className={`flex-1 rounded-md border p-2 ${personaData.gender === '여성' ? selectedStyle : ''}`}>여성</button>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">연령대</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {["10대", "20대", "30대", "40대", "50대 이상"].map(age => (
              <button key={age} onClick={() => onPersonaChange('age', age)} className={`rounded-md border p-2 ${personaData.age === age ? selectedStyle : ''}`}>{age}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">성향 (MBTI)</label>
          <div className="mt-2 space-y-2">
            {[
                {key1: 'e', value1: 'E', label1: '외향', key2: 'i', value2: 'I', label2: '내향'},
                {key1: 's', value1: 'S', label1: '감각', key2: 'n', value2: 'N', label2: '직관'},
                {key1: 't', value1: 'T', label1: '사고', key2: 'f', value2: 'F', label2: '감정'},
                {key1: 'j', value1: 'J', label1: '판단', key2: 'p', value2: 'P', label2: '인식'}
            ].map(pair => (
                <div key={pair.key1} className="grid grid-cols-2 gap-2">
                    <button onClick={() => handlePairChange(pair.key1, pair.value1, pair.key2)} className={`rounded-lg border py-3 text-base font-semibold transition ${personaData.personality[pair.key1 as keyof Persona['personality']] ? selectedStyle : ''}`}>{pair.label1} ({pair.value1})</button>
                    <button onClick={() => handlePairChange(pair.key2, pair.value2, pair.key1)} className={`rounded-lg border py-3 text-base font-semibold transition ${personaData.personality[pair.key2 as keyof Persona['personality']] ? selectedStyle : ''}`}>{pair.label2} ({pair.value2})</button>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

// 메인 페이지 컴포넌트
export default function MateDetailClientPage({ mateId }: { mateId: string }) {
  // TODO: [DB] 실제로는 mateId를 사용해 DB에서 메이트 정보를 불러와야 합니다.
  logInfo("메이트 수정 시작", { mateId });

  const [mateName, setMateName] = useState("메이트");
  const [persona, setPersona] = useState<Persona>({ gender: "남성", age: "20대", personality: { e: "E", i: "", s: "S", n: "", t: "", f: "F", j: "", p: "P" } });
  const [reviews, setReviews] = useState<string[]>(["이 메이트는 친절하고 다정하게 답변해줘.", "가끔은 시니컬한 농담을 던지기도 해."]);
  const [isPersonaEditorOpen, setIsPersonaEditorOpen] = useState(false);

  const handlePersonaChange = (field: keyof Omit<Persona, 'personality'>, value: string) => { setPersona(prev => ({ ...prev, [field]: prev[field] === value ? "" : value })); };
  const handlePersonalityChange = (type: string, value: string) => {
    setPersona(prev => ({...prev, personality: {...prev.personality, [type]: value }}));
  };
  const handleAddReview = () => { setReviews(prev => ["", ...prev]); };
  const handleReviewChange = (index: number, value: string) => { const newReviews = [...reviews]; newReviews[index] = value; setReviews(newReviews); };
  const handleRemoveReview = (index: number) => { setReviews(prev => prev.filter((_, i) => i !== index)); };
  
  const handleSave = () => {
    // TODO: [DB] 변경된 메이트 이름, 페르소나, 리뷰 목록을 mateId를 기준으로 DB에 '업데이트(update)'해야 합니다.
    logInfo("메이트 정보 저장", { mateName, persona, reviews });
    showSuccess("메이트 정보가 저장되었습니다.");
  };

  return (
    <div>
      <SubPageHeader title="메이트 상세 수정" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg space-y-8">
          <div className="space-y-2">
            <label className="font-semibold">이름</label>
            <input type="text" value={mateName} onChange={(e) => setMateName(e.target.value)} className="w-full rounded-lg border bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:focus:ring-white"/>
          </div>

          <div className="space-y-2">
            <div className="flex w-full items-center justify-between text-left">
              <span className="font-semibold">간편 설정</span>
              <button onClick={() => setIsPersonaEditorOpen(!isPersonaEditorOpen)} className="text-sm text-blue-500">{isPersonaEditorOpen ? '완료' : '수정'}</button>
            </div>
            {isPersonaEditorOpen ? (
              <PersonaEditor 
                personaData={persona} 
                onPersonaChange={handlePersonaChange}
                onPersonalityChange={handlePersonalityChange}
              />
            ) : (
              <div className="rounded-lg border p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
                <p>성별: {persona.gender || "미설정"}</p><p>연령대: {persona.age || "미설정"}</p><p>성향: {Object.values(persona.personality).filter(Boolean).join('') || "미설정"}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex w-full items-center justify-between text-left">
              <span className="font-semibold">리뷰 리스트</span>
              <div className="flex items-center gap-2">
                <button onClick={handleAddReview} className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"><FaPlus size={10} /><span>리뷰 추가</span></button>
                <button onClick={handleSave} className="rounded-full bg-blue-500 px-4 py-1.5 text-xs text-white transition hover:bg-blue-600">저장</button>
              </div>
            </div>
            <div className="rounded-lg border p-4 dark:border-gray-700">
              <div className="space-y-3">
                {reviews.map((review, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <textarea value={review} onChange={(e) => handleReviewChange(index, e.target.value)} rows={3} className="flex-grow rounded-lg border bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:focus:ring-white"/>
                    <button onClick={() => handleRemoveReview(index)} className="p-2 text-gray-400 transition hover:text-red-500"><FaTrash /></button>
                  </div>
                ))}
                {reviews.length === 0 && (<p className="text-center text-sm text-gray-400">추가된 리뷰가 없습니다.</p>)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}