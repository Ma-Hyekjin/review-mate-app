// app/(legal)/support/page.tsx
"use client";

import { useState } from "react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { showError, showSuccess } from "@/utils/toast";
import { logInfo } from "@/lib/logger";

export default function SupportPage() {
  const [inquiry, setInquiry] = useState("");

  const handleSubmit = () => {
    if (inquiry.trim() === "") {
      showError("문의 내용을 입력해주세요.");
      return;
    }
    // TODO: [API] 여기서 입력된 문의 내용(inquiry)을 서버로 전송하는 API를 호출해야 합니다.
    logInfo("문의 접수", { inquiry });
    showSuccess("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.");
    setInquiry("");
  };

  return (
    <div>
      <SubPageHeader title="고객센터" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">무엇을 도와드릴까요?</h2>
            <textarea value={inquiry} onChange={(e) => setInquiry(e.target.value)} rows={8} placeholder="문의하실 내용을 여기에 입력해주세요." className="w-full rounded-lg border bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:focus:ring-white" />
            <button onClick={handleSubmit} className="flex w-full items-center justify-center gap-2 rounded-lg bg-black p-4 text-white dark:bg-white dark:text-black">
              <FaPaperPlane /><span>문의 접수하기</span>
            </button>
          </div>
          <div className="rounded-lg border p-4 text-center dark:border-gray-700">
            <FaEnvelope className="mx-auto mb-2 text-2xl" />
            <p className="font-semibold">이메일 문의</p>
            <a href="mailto:tema0311@hanyang.ac.kr" className="text-gray-600 hover:underline dark:text-gray-400">tema0311@hanyang.ac.kr</a>
          </div>
        </div>
      </main>
    </div>
  );
}