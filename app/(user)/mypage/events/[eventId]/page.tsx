// app/(user)/events/[eventId]/page.tsx

// =================================================
// === 최종 수정 버전입니다. 이 주석이 보이면 성공입니다. ===
// =================================================
"use client";

import SubPageHeader from "@/components/SubPageHeader";
import Image from "next/image";

interface EventDetailPageProps {
  params: { eventId: string };
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

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = getEventDetails(params.eventId);

  return (
    <div>
      <SubPageHeader title={event.title} />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
            <Image
              src={event.detailImage}
              alt={event.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}