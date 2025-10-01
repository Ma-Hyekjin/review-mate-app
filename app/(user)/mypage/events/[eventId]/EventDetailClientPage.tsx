// app/(user)/mypage/events/[eventId]/EventDetailClientPage.tsx
// 새로 만드는 파일입니다. 기존 page.tsx의 내용을 대부분 가져옵니다.
"use client"; // 클라이언트 컴포넌트로 명시

import SubPageHeader from "@/components/SubPageHeader";
import Image from "next/image";

// 서버 컴포넌트에서 string으로 받은 eventId에 대한 타입 정의
interface EventDetailClientPageProps {
  eventId: string;
}

// TODO: [DB] 실제로는 params.eventId를 사용해 DB에서 해당 이벤트의 상세 정보를 불러와야 합니다.
const getEventDetails = (id: string) => {
  if (id === "1") {
    return { title: "리뷰메이트 출시 기념 이벤트!", detailImage: "/event-detail-1.png" };
  }
  if (id === "2") {
    return { title: "친구 초대하고 혜택 받자!", detailImage: "/event-detail-2.png" };
  }
  return { title: "이벤트 상세", detailImage: "/event-detail-3.png" };
};

export default function EventDetailClientPage({ eventId }: EventDetailClientPageProps) {
  // 이제 props로 받은 eventId를 사용합니다.
  const event = getEventDetails(eventId);

  return (
    <div>
      <SubPageHeader title={event.title} />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
            <Image
              src={event.detailImage}
              alt={event.title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}