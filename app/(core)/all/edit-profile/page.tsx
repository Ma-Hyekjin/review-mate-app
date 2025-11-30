// app/(user)/edit-profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { FcGoogle } from "react-icons/fc";
import type { Persona, PersonaEditorProps } from '@/types/mate';
function PersonaEditor({ personaData, onPersonaChange, onPersonalityChange }: PersonaEditorProps) {
  const selectedStyle = "bg-black text-white dark:bg-white dark:text-black";
  const personalityPairs = [
    { key: 'e', value: 'E' }, { key: 'i', value: 'I' }, { key: 's', value: 'S' }, { key: 'n', value: 'N' },
    { key: 't', value: 'T' }, { key: 'f', value: 'F' }, { key: 'j', value: 'J' }, { key: 'p', value: 'P' },
  ];
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
        <label className="text-sm font-semibold">성향</label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {personalityPairs.map(pair => (
            <button key={pair.key} onClick={() => onPersonalityChange(pair.key, pair.value)} className={`rounded-lg border py-3 text-base font-semibold transition hover:bg-gray-100 dark:hover:bg-gray-800 ${ personaData.personality[pair.key as keyof typeof personaData.personality] ? selectedStyle : '' }`}>{pair.value}</button>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function EditProfilePage() {
  const [initialData, setInitialData] = useState<{ nickname: string; persona: Persona }>({ nickname: "김혁진", persona: { gender: "남성", age: "20대", personality: { e: "E", i: "", s: "S", n: "", t: "T", f: "", j: "J", p: "" } } });
  const [nickname, setNickname] = useState(initialData.nickname);
  const [persona, setPersona] = useState<Persona>(initialData.persona);
  const [isEditingPersona, setIsEditingPersona] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const nicknameChanged = initialData.nickname !== nickname;
    const personaChanged = JSON.stringify(initialData.persona) !== JSON.stringify(persona);
    setHasChanges(nicknameChanged || personaChanged);
  }, [nickname, persona, initialData]);

  // --- 수정된 로직 1 ---
  const handlePersonaChange = (field: keyof Omit<Persona, 'personality'>, value: string) => {
    // 취소 기능 없이, 항상 새로운 값으로 설정
    setPersona(prev => ({ ...prev, [field]: value }));
  };

  // --- 수정된 로직 2 ---
  const handlePersonalityChange = (type: string, value: string) => {
    const opposites = { e: 'i', i: 'e', s: 'n', n: 's', t: 'f', f: 't', j: 'p', p: 'j' };
    const oppositeType = opposites[type as keyof typeof opposites];
    // 취소 기능 없이, 항상 새로운 값을 설정하고 반대쪽은 초기화
    setPersona(prev => ({
      ...prev,
      personality: { ...prev.personality, [type]: value, [oppositeType]: "" },
    }));
  };

  const handleSave = () => { /* ... */ };
  const handleAccountDeletion = () => { /* ... */ };
  const saveButton = <button onClick={handleSave} disabled={!hasChanges} className="rounded-md px-4 py-1.5 text-sm font-semibold text-blue-500 disabled:text-gray-400">저장</button>;

  return (
    <div>
      <SubPageHeader title="나의 정보 수정" actionButton={saveButton} />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg space-y-8">
          <div className="space-y-2">
            <label className="font-semibold">닉네임</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full rounded-lg border bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:focus:ring-white"/>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold">나의 성향</label>
              <button onClick={() => setIsEditingPersona(!isEditingPersona)} className="text-sm text-blue-500">{isEditingPersona ? '완료' : '수정'}</button>
            </div>
            {isEditingPersona ? ( <PersonaEditor personaData={persona} onPersonaChange={handlePersonaChange} onPersonalityChange={handlePersonalityChange} /> ) : (
              <div className="rounded-lg border p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
                <p>성별: {persona.gender}</p><p>연령대: {persona.age}</p><p>성향: {Object.values(persona.personality).join('')}</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="font-semibold">연결된 계정</label>
            <div className="flex items-center gap-4 rounded-lg border p-4 dark:border-gray-700">
              <FcGoogle size={24} /><span className="text-sm">hyeokjin@example.com</span>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 dark:border-gray-700 text-center">
            <button onClick={handleAccountDeletion} className="text-sm text-gray-400 underline hover:text-red-500 dark:text-gray-600 dark:hover:text-red-500">회원 탈퇴</button>
          </div>
        </div>
      </main>
    </div>
  );
}