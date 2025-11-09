// app/(auth)/quick-pick/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "gender" | "age" | "personality" | "name" | "confirm" | "details" ;
const STEPS: Step[] = ["gender", "age", "personality", "name", "confirm", "details"]; // 진행 바 계산용

const initialPersonaInfo = {
  gender: "",
  age: "",
  personality: { e: "", i: "", s: "", n: "", t: "", f: "", j: "", p: "" },
  name: "메이트",
  details: ["", "", "", "", ""], // 리뷰 5개
};

export default function QuickPickPage() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<Step>("gender");
  const [personaInfo, setPersonaInfo] = useState(initialPersonaInfo);

  // --- 기존 핸들러 함수들은 그대로 유지 ---
  const handleSelect = (field: "gender" | "age", value: string) => {
    setPersonaInfo(prev => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };
  const handlePersonalitySelect = (type: string, value: string) => {
    const opposites = { e: 'i', i: 'e', s: 'n', n: 's', t: 'f', f: 't', j: 'p', p: 'j' };
    const oppositeType = opposites[type as keyof typeof opposites];
    setPersonaInfo(prev => { const isCanceling = prev.personality[type as keyof typeof prev.personality] === value;
      return {
        ...prev,
        personality: {
          ...prev.personality,
          [type]: isCanceling ? "" : value,
          // 반대쪽 버튼을 자동으로 해제하는 로직
          [oppositeType]: isCanceling ? prev.personality[oppositeType as keyof typeof prev.personality] : "",
        },
      };
    });
  };
  const handleReset = () => {
    setPersonaInfo(initialPersonaInfo); // 상태를 초기값("메이트" 포함)으로 리셋
    setCurrentStep("gender"); // 첫 단계(성별)로 이동};
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {setPersonaInfo(prev => ({ ...prev, name: e.target.value }));};
  const goToConfirmStep = () => {
    // 이름이 비어있으면 "메이트"로, 아니면 입력값으로
    const finalName = personaInfo.name.trim() === "" ? "메이트" : personaInfo.name.trim();
    const nameRegex = /^[a-zA-Z가-힣0-9-_.]{1,}$/;
    
    if (!nameRegex.test(finalName)) {
      alert("이름은 1글자 이상의 한글, 영문, 숫자 또는 '-', '_', '.'만 사용할 수 있습니다.");
      return;
    }
    setPersonaInfo(prev => ({ ...prev, name: finalName }));
    setCurrentStep("confirm");
  };

  // 👇 [추가] 'details' 5개 입력창을 위한 핸들러
  const handleDetailsChange = (index: number, value: string) => {
    setPersonaInfo(prev => {
      const newDetails = [...prev.details];
      newDetails[index] = value;
      return { ...prev, details: newDetails };
    });
  };

  // 👇 [추가] 'details' 단계(저장하기)에서 'final' 단계로 이동
  const handleSaveAndFinish = async () => {
    // 1. 저장할 데이터 준비
    const { name, details, ...personaWithoutDetails } = personaInfo;
    
    // name과 details를 포함하여 모든 정보를 JSON 문자열로 직렬화
    const personaData = { 
        ...personaWithoutDetails, 
        details: details.filter(d => d.trim() !== ""), // 빈 텍스트 제거
    };

    const finalPersonaJson = JSON.stringify(personaData);

    try {
        // 2. API 호출
        const response = await fetch('/api/mate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                personaJson: finalPersonaJson,
            }),
        });

        if (!response.ok) {
            // 서버 오류 처리
            throw new Error('메이트 저장에 실패했습니다.');
        }

        // 3. 성공 시 리디렉션
        console.log("메이트 저장 성공!");
        router.push("/quick-pick/complete"); // 완료 페이지로 이동

    } catch (error) {
        alert("메이트 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        console.error(error);
    }
  };

  // 👇 [추가] 'details' 단계(건너뛰기)에서 'final' 단계로 이동
  const handleSkipAndFinish = async () => {
    // 1. 저장할 데이터 준비 (Details만 빈 배열로 저장)
    const { name, details, ...personaWithoutDetails } = personaInfo;
    
    const personaData = { 
        ...personaWithoutDetails, 
        details: [], // Details는 빈 배열로 저장
    };
    
    const finalPersonaJson = JSON.stringify(personaData);

    try {
        // 2. API 호출
        const response = await fetch('/api/mate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                personaJson: finalPersonaJson,
            }),
        });

        if (!response.ok) {
            throw new Error('메이트 저장에 실패했습니다.');
        }

        // 3. 성공 시 리디렉션
        console.log("메이트 저장 성공 (건너뛰기).");
        router.push("/quick-pick/complete"); // 완료 페이지로 이동

    } catch (error) {
        alert("메이트 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        console.error(error);
    }
  };

  const handleConfirm = () => {
    setCurrentStep("details");
  };

  // --- 핸들러 함수 끝 ---

  // 진행 바 계산
  const currentStepIndex = STEPS.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / STEPS.length) * 100;

  // --- 버튼 스타일 정의 (가독성 및 재사용) ---
  const genderButtonBase = "h-[51px] w-[327px] rounded-[30px] border border-[#E6FCFF] text-title-sm font-bold text-white flex items-center justify-center transition-colors";
  const genderUnselected = "bg-blue-light-300"; // 비선택
  const genderSelected = "bg-primary-light";    // 선택

  const personalityButtonBase = "h-[51px] w-[148px] rounded-[30px] border border-[#E6FCFF] text-title-sm font-bold text-white flex items-center justify-center transition-colors";

  const nextButtonBase = "h-[51px] w-[343px] rounded-[30px] border border-[#7AE7FF] text-caption font-medium flex items-center justify-center transition-colors text-white";
  const nextButtonDisabled = "bg-[linear-gradient(0deg,_#E6FCFF_-154.9%,_#73CEF0_4.32%,_#00A0E0_81.55%)]";
  const nextButtonEnabled = "bg-primary-light";

  // 'details' 입력창
  const detailsInputBase = "w-[316px] h-[67px] rounded-[22px] border border-[#26BBED] bg-transparent pt-[22px] pb-[10px] px-[10px] text-caption font-medium text-foreground placeholder-gray-4 focus:outline-none focus:ring-1 focus:ring-primary-light resize-none placeholder:text-center";

  // '건너뛰기'
  const skipButtonBase = "text-caption text-gray-5 hover:text-primary-light transition-colors";

  // --- 스타일 정의 끝 ---

  const renderStepContent = () => {
    switch (currentStep) {
      case "gender":
        return (
          <>
            {/* === 타이틀 영역 === */}
            <div className="text-left w-full">
              <h1 className="text-title-lg font-bold text-foreground">
                본인의 성별을<br/>선택해주세요
              </h1>
              <p className="text-caption font-regular text-gray-5 mt-2">
                선택하신 내용은 리뷰 생성에 반영됩니다.
              </p>
            </div>

            {/* === 버튼 영역 === */}
            <div className="flex flex-col gap-2.5 items-center mt-24">
              <button
                onClick={() => handleSelect("gender", "여성")}
                className={`${genderButtonBase} ${personaInfo.gender === '여성' ? genderSelected : genderUnselected}`}
              >
                여성
              </button>
              <button
                onClick={() => handleSelect("gender", "남성")}
                className={`${genderButtonBase} ${personaInfo.gender === '남성' ? genderSelected : genderUnselected}`}
              >
                남성
              </button>
            </div>
          </>
        );
      case "age":
        const ageOptions = ["10대", "20대", "30대", "40대", "50대 이상"];
        return (
          <>
            {/* === 타이틀 영역 === */}
            <div className="text-left w-full">
              <h1 className="text-title-lg font-bold text-foreground">
                본인의 나이대를<br/>선택해주세요
              </h1>
              <p className="text-caption font-regular text-gray-5 mt-2">
                선택하신 내용은 리뷰 생성에 반영됩니다.
              </p>
            </div>

            {/* === 버튼 영역 === */}
            <div className="flex flex-col gap-[13px] items-center mt-24">
              {ageOptions.map((ageLabel) => (
                <button
                  key={ageLabel}
                  onClick={() => handleSelect("age", ageLabel)}
                  className={`${genderButtonBase} ${personaInfo.age === ageLabel ? genderSelected : genderUnselected}`}
                >
                  {ageLabel}
                </button>
              ))}
            </div>
          </>
        );
        case "personality":
          // 성향 버튼 데이터 (2열 배치를 위해 순서대로)
          const personalityPairs = [
            { key: 'e', value: 'E' }, { key: 'i', value: 'I' }, // 1행
            { key: 's', value: 'S' }, { key: 'n', value: 'N' }, // 2행
            { key: 't', value: 'T' }, { key: 'f', value: 'F' }, // 3행
            { key: 'j', value: 'J' }, { key: 'p', value: 'P' }, // 4행
          ];
  
          return (
            <>
              {/* === 타이틀 영역 === */}
              <div className="text-left w-full mt-6">
                <h1 className="text-title-lg font-bold text-foreground">
                  본인의 성향을<br/>선택해주세요
                </h1>
                <p className="text-caption font-regular text-gray-5 mt-2">
                  선택하신 내용은 리뷰 생성에 반영됩니다.
                </p>
              </div>
  
              {/* === 버튼 영역 === */}
              <div className="grid grid-cols-2 gap-x-[30px] gap-y-[13px] mt-12">
                {personalityPairs.map(pair => (
                  <button
                    key={pair.key}
                    onClick={() => handlePersonalitySelect(pair.key, pair.value)}
                    className={`${personalityButtonBase} ${
                      personaInfo.personality[pair.key as keyof typeof personaInfo.personality]
                        ? genderSelected // 선택됨
                        : genderUnselected // 비선택
                    }`}
                  >
                    {pair.value}
                  </button>
                ))}
              </div>
            </>
          );
          case "name":
            return (
              <>
                {/* === 타이틀 영역 === */}
              <div className="text-left w-full mt-6">
                <h1 className="text-title-lg font-bold text-foreground">
                  메이트의 이름을<br/>입력해주세요
                </h1>
                <p className="text-caption font-regular text-gray-5 mt-2">
                  선택하신 내용은 리뷰 생성에 반영됩니다.
                </p>
              </div>

                {/* === 입력 필드 영역 === */}
                <div className="mt-16 w-full flex justify-center">
                  <input
                    type="text"
                    value={personaInfo.name} // 초기값 "메이트"
                    onChange={handleNameChange}
                    className="h-[51px] w-[327px] rounded-[30px] border border-blue-light-100 bg-blue-light-300 px-[10px] py-[10px] text-center text-title-sm font-bold text-white placeholder-blue-light-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-shadow" // 👈 직접 스타일 명시
                  />
                </div>
              </>
            );
      case "confirm":
        const personalityResult = Object.values(personaInfo.personality).join('');
        const infoRowStyle = "flex justify-between items-center text-caption";
        const infoLabelStyle = "text-gray-5";
        const infoValueStyle = "font-medium text-foreground";

        return (
          <>
            <div className="text-left w-full mt-6">
              <h1 className="text-title-lg font-bold text-foreground">
                선택하신 내용이<br/>맞으신가요?
              </h1>
              <p className="text-caption font-regular text-gray-5 mt-2">
                이제 마무리 단계입니다.
              </p>
            </div>
            <div className="w-full flex justify-center mt-10">
              <div className="w-[327px] h-[178px] rounded-[22px] border-[1.5px] p-[10px] bg-blue-light-200/10 border-primary-light flex flex-col gap-[10px] justify-center px-4">
                {/* ... (이름, 성별, 나이대, 성향 표시 로직) ... */}
                <div className={infoRowStyle}><span className={infoLabelStyle}>이름:</span><span className={infoValueStyle}>{personaInfo.name}</span></div>
                <div className={infoRowStyle}><span className={infoLabelStyle}>성별:</span><span className={infoValueStyle}>{personaInfo.gender}</span></div>
                <div className={infoRowStyle}><span className={infoLabelStyle}>나이대:</span><span className={infoValueStyle}>{personaInfo.age}</span></div>
                <div className={infoRowStyle}><span className={infoLabelStyle}>성향:</span><span className={infoValueStyle}>{personalityResult}</span></div>
              </div>
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={handleReset} // '다시 생성하기' -> 첫 단계로
                className="text-caption text-gray-5 hover:text-primary-light transition-colors"
              >
                다시 생성하기
              </button>
            </div>
          </>
        );

      //'details' 단계 UI
      case "details":
        return (
          <>
            <div className="text-left w-full mt-6">
              <h1 className="text-title-lg font-bold text-foreground">
                자세한 내용을<br/>작성해주세요
              </h1>
              <p className="text-caption font-regular text-gray-5 mt-2">
                이제 마지막 단계입니다
              </p>
              <p className="text-caption font-regular text-gray-5 mt-4">
                참고가 될만한 텍스트를 입력해주세요
              </p>
            </div>
            <div className="flex flex-col gap-[10px] items-center mt-8 w-full">
              {personaInfo.details.map((text, index) => (
                <textarea
                  key={index}
                  value={text}
                  onChange={(e) => handleDetailsChange(index, e.target.value)}
                  placeholder={`참고 텍스트 ${index + 1}`}
                  className={detailsInputBase}
                  rows={2}
                />
              ))}
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={handleSkipAndFinish}
                className={skipButtonBase} // 밑줄 없는 텍스트 버튼
              >
                건너뛰기
              </button>
            </div>
          </>
        );
      default: return null;
    }
  };

  // 다음 버튼 활성화 조건
  const isNextDisabled = () => {
    switch (currentStep) {
      case "gender": return !personaInfo.gender;
      case "age": return !personaInfo.age;
      case "personality": return Object.values(personaInfo.personality).filter(v => v).length !== 4;
      case "name": return false; // 이름 단계에서는 항상 활성화 (goToConfirmStep에서 검증)
      default: return true;
    }
  };

  // 다음 단계 이동 로직
  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    // [수정] 'name' 단계 전까지만 '다음' 버튼으로 이동
    if (nextIndex < STEPS.indexOf("confirm")) { 
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-gradient-to-t from-blue-light-200 via-blue-light-100 to-background">
      <div className="w-full max-w-md flex flex-col min-h-screen"> {/* 중앙 정렬 컨테이너 */}

        {/* === 1. 진행 바 === */}
        <div className="w-1/2 h-1.5 bg-gray-200 mt-5"> {/* 너비 50%, 상단 여백 */}
          <div
            className="h-full bg-primary-light transition-all duration-300 ease-in-out" // 파란색 채우기
            style={{ width: `${progressPercentage}%` }} // 진행률에 따라 너비 변경
          />
        </div>

        {/* === 2. 콘텐츠 영역 === */}
        <div className="flex flex-col flex-grow items-center px-6 pt-10 pb-6"> {/* 좌우 패딩 24px = px-6 */}
          {renderStepContent()}
        </div>

        {/* === 3. "다음" 버튼 (gender, age, personality 용) === */}
        {(currentStep === 'gender' || currentStep === 'age' || currentStep === 'personality') && (
          <div className="px-4 pb-10 flex justify-center">
            <button
              onClick={goToNextStep}
              disabled={isNextDisabled()}
              className={`${nextButtonBase} ${isNextDisabled() ? nextButtonDisabled : nextButtonEnabled}`}
            >
              다음
            </button>
          </div>
        )}

         {/* === 3-1. "Name" 단계 버튼 === */}
         {currentStep === 'name' && (
           <div className="px-4 pb-10 flex justify-center">
             <button
               onClick={goToConfirmStep} // 'name' -> 'confirm'
               className={`${nextButtonBase} ${nextButtonEnabled}`}
             >
               다음
             </button>
           </div>
         )}

         {/* === 3-2. "Confirm" 단계 버튼 === */}
         {currentStep === 'confirm' && (
           <div className="px-4 pb-10 flex justify-center">
             <button
               onClick={handleConfirm} // [수정] 'confirm' -> 'details'
               className={`${nextButtonBase} ${nextButtonEnabled}`}
             >
               완료!
             </button>
           </div>
         )}
         
         {/* === 3-3. "Details" 단계 버튼 === */}
         {currentStep === 'details' && (
           <div className="px-4 pb-10 flex flex-col items-center gap-4">
             <button
               onClick={handleSaveAndFinish} // 'details' -> 'final'
               className={`${nextButtonBase} ${nextButtonEnabled}`}
             >
               저장하고 시작하기
             </button>
           </div>
         )}
         
         {/* === 3-4. "Final" 단계 (버튼 없음) === */}
      </div>
    </main>
  );
}