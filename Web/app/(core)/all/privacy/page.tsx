// app/(legal)/privacy/page.tsx

"use client"; 

import SubPageHeader from "@/components/layout/SubPageHeader";

export default function PrivacyPage() {
  return (
    <div>
      <SubPageHeader title="개인정보 처리방침" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            <strong>시행일자: 2025년 9월 27일</strong>
          </p>
          {/* TODO: [CONTENT] 이 내용은 실제 서비스 정책에 맞게 법률 전문가의 검토를 거친 후 수정되어야 합니다. */}
          <div className="space-y-6 text-sm">
            <section className="space-y-2">
              <h2 className="text-xl font-bold">제1조 (총칙)</h2>
              <p>리뷰메이트(이하 회사)는 이용자의 개인정보를 중요시하며, 정보통신망 이용촉진 및 정보보호에 관한 법률을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.</p>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-bold">제2조 (수집하는 개인정보의 항목)</h2>
              <p>회사는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해 최초 회원가입 당시 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.</p>
              <ul className="list-disc pl-5">
                <li>필수항목: 이메일, 소셜 로그인 정보</li>
                <li>선택항목: 페르소나 설정 정보(성별, 연령대, 성향, 이름)</li>
              </ul>
            </section>
            <section className="space-y-2">
              <h2 className="text-xl font-bold">제3조 (개인정보의 수집 및 이용목적)</h2>
              <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
              <ul className="list-disc pl-5">
                <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                <li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별</li>
                <li>마케팅 및 광고에 활용: 신규 서비스(제품) 개발 및 특화</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}