// app/(auth)/quick-pick/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChild, FaUser, FaUserTie, FaUserGraduate, FaRegUserCircle } from "react-icons/fa";

type Step = "gender" | "age" | "personality" | "name" | "confirm";

const initialPersonaInfo = {
  gender: "",
  age: "",
  personality: { e: "", i: "", s: "", n: "", t: "", f: "", j: "", p: "" },
  name: "",
};

export default function QuickPickPage() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<Step>("gender");
  const [personaInfo, setPersonaInfo] = useState(initialPersonaInfo);

  const handleSelect = (field: "gender" | "age", value: string) => {
    setPersonaInfo(prev => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const handlePersonalitySelect = (type: string, value: string) => {
    const opposites = { e: 'i', i: 'e', s: 'n', n: 's', t: 'f', f: 't', j: 'p', p: 'j' };
    const oppositeType = opposites[type as keyof typeof opposites];
    
    setPersonaInfo(prev => {
      const isCanceling = prev.personality[type as keyof typeof prev.personality] === value;
      return {
        ...prev,
        personality: {
          ...prev.personality,
          [type]: isCanceling ? "" : value,
          [oppositeType]: isCanceling ? prev.personality[oppositeType as keyof typeof prev.personality] : "",
        },
      };
    });
  };

  const handleReset = () => {
    setPersonaInfo(initialPersonaInfo);
    setCurrentStep("gender");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonaInfo(prev => ({ ...prev, name: e.target.value }));
  };

  const goToConfirmStep = () => {
    const finalName = personaInfo.name.trim() === "" ? "메이트" : personaInfo.name.trim();
    const nameRegex = /^[a-zA-Z가-힣0-9-_.]{1,}$/;
    
    if (!nameRegex.test(finalName)) {
      alert("이름은 1글자 이상의 한글, 영문, 숫자 또는 '-', '_', '.'만 사용할 수 있습니다.");
      return;
    }
    
    setPersonaInfo(prev => ({ ...prev, name: finalName }));
    setCurrentStep("confirm");
  };

  const handleSubmit = () => {
    // TODO: [DB] 생성된 페르소나 정보를 DB에 '생성(create)'하는 API를 호출해야 합니다.
    console.log("최종 페르소나 정보:", personaInfo);
    router.push("/persona-details"); // 추가 설정 페이지로 이동
  };

  const renderStep = () => {
    const selectedStyle = "bg-black text-white dark:bg-white dark:text-black ring-2 ring-offset-2 ring-black dark:ring-white";
    const nextButtonStyle = "w-full rounded-lg bg-black p-4 text-white disabled:bg-gray-300 dark:bg-white dark:text-black dark:disabled:bg-gray-600";

    switch (currentStep) {
      case "gender":
        return (
          <div className="w-full space-y-6">
            <div className="flex w-full gap-4">
              <button onClick={() => handleSelect("gender", "남성")} className={`w-full rounded-lg border p-8 text-xl transition hover:bg-gray-100 dark:hover:bg-gray-800 ${personaInfo.gender === '남성' ? selectedStyle : ''}`}>남성</button>
              <button onClick={() => handleSelect("gender", "여성")} className={`w-full rounded-lg border p-8 text-xl transition hover:bg-gray-100 dark:hover:bg-gray-800 ${personaInfo.gender === '여성' ? selectedStyle : ''}`}>여성</button>
            </div>
            <button onClick={() => setCurrentStep("age")} disabled={!personaInfo.gender} className={nextButtonStyle}>다음</button>
          </div>
        );
      case "age":
        const ageOptions = [
          { label: "10대", icon: <FaChild /> }, { label: "20대", icon: <FaUserGraduate /> }, { label: "30대", icon: <FaUserTie /> }, { label: "40대", icon: <FaUser /> }, { label: "50대 이상", icon: <FaRegUserCircle /> },
        ];
        return (
          <div className="w-full space-y-6">
            <div className="flex w-full flex-col gap-3">
              {ageOptions.map(age => (
                <button key={age.label} onClick={() => handleSelect("age", age.label)} className={`flex items-center justify-center gap-3 rounded-lg border p-4 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800 ${personaInfo.age === age.label ? selectedStyle : ''}`}>{age.icon}<span>{age.label}</span></button>
              ))}
            </div>
            <button onClick={() => setCurrentStep("personality")} disabled={!personaInfo.age} className={nextButtonStyle}>다음</button>
          </div>
        );
      case "personality":
        const personalityPairs = [
          { key: 'e', value: 'E' }, { key: 'i', value: 'I' }, { key: 's', value: 'S' }, { key: 'n', value: 'N' }, { key: 't', value: 'T' }, { key: 'f', value: 'F' }, { key: 'j', value: 'J' }, { key: 'p', value: 'P' },
        ];
        const isAllSelected = Object.values(personaInfo.personality).filter(v => v).length === 4;
        return (
          <div className="w-full max-w-xs space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {personalityPairs.map(pair => (
                <button key={pair.key} onClick={() => handlePersonalitySelect(pair.key, pair.value)} className={`rounded-lg border py-4 text-lg font-semibold transition hover:bg-gray-100 dark:hover:bg-gray-800 ${ personaInfo.personality[pair.key as keyof typeof personaInfo.personality] ? selectedStyle : '' }`}>{pair.value}</button>
              ))}
            </div>
            <button onClick={() => setCurrentStep("name")} disabled={!isAllSelected} className={nextButtonStyle}>다음</button>
          </div>
        );
      case "name":
        return (
          <div className="w-full space-y-4">
            <input type="text" value={personaInfo.name} onChange={handleNameChange} placeholder="메이트" className="w-full rounded-lg border bg-transparent p-4 text-center text-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"/>
            <button onClick={goToConfirmStep} className="w-full rounded-lg bg-black p-4 text-white dark:bg-white dark:text-black">완료</button>
          </div>
        );
      case "confirm":
        const personalityResult = Object.values(personaInfo.personality).join('');
        return (
          <div className="w-full space-y-6 text-left">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">성별: {personaInfo.gender}</p>
              <p className="text-sm text-gray-500">연령대: {personaInfo.age}</p>
              <p className="text-sm text-gray-500">성향: {personalityResult}</p>
              <p className="text-sm text-gray-500">이름: {personaInfo.name}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={handleReset} className="w-full rounded-lg border p-4 transition hover:bg-gray-100 dark:hover:bg-gray-800">다시 설정</button>
              <button onClick={handleSubmit} className="w-full rounded-lg bg-black p-4 text-white dark:bg-white dark:text-black">이대로 생성</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  const stepTitles: Record<Step, string> = {
    gender: "성별을 선택해주세요.", age: "연령대를 선택해주세요.", personality: "당신의 성향을 알려주세요.", name: "친구의 이름은 무엇인가요?", confirm: "이대로 생성할까요?",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold">{stepTitles[currentStep]}</h1>
        <div className="flex min-h-[300px] items-center justify-center">
          {renderStep()}
        </div>
      </div>
    </main>
  );
}