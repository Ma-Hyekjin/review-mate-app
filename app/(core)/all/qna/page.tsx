// app/(legal)/qna/page.tsx
"use client";

import { useState } from "react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// TODO: [DB] 실제로는 DB나 CMS에서 Q&A 목록을 '불러와야(fetch)' 합니다.
const faqData = [
  { question: "메이트 페르소나는 어떻게 변경하나요?", answer: "마이페이지 > 메이트 정보 카드에서 '전환' 버튼을 눌러 새로운 페르소나를 생성하거나 기존 페르소나를 선택할 수 있습니다." },
  { question: "소셜 로그인 계정을 변경하고 싶어요.", answer: "현재 버전에서는 한번 연동된 소셜 계정은 변경할 수 없습니다. 계정 탈퇴 후 새로운 계정으로 재가입해야 합니다." },
  { question: "리뷰 생성은 하루에 몇 번까지 가능한가요?", answer: "현재는 별도의 제한 없이 자유롭게 리뷰 생성이 가능합니다. 추후 정책이 변경될 경우 공지사항을 통해 안내해 드리겠습니다." },
];

export default function QnAPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div>
      <SubPageHeader title="Q&A" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="rounded-lg border dark:border-gray-700">
              <button onClick={() => toggleQuestion(index)} className="flex w-full items-center justify-between p-4 text-left">
                <span className="font-semibold">{faq.question}</span>
                {openQuestion === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openQuestion === index && (
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}