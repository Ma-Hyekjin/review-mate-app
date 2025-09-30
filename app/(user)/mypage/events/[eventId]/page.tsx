// app/(user)/events/[eventId]/page.tsx
"use client";

import SubPageHeader from "@/components/SubPageHeader";
import Image from "next/image";

// TODO: [DB] 실제로는 params.eventId를 사용해 DB에서 해당 이벤트의 상세 정보를 '불러와야(fetch)' 합니다.
const getEventDetails = (id: string) => {
  // 지금은 id에 따라 다른 임시 데이터를 반환하는 가짜 함수입니다.
  if (id === "1") {
    return { title: "리뷰메이트 출시 기념 이벤트!", detailImage: "/event-detail-1.png" };
  }
  if (id === "2") {
    return { title: "친구 초대하고 혜택 받자!", detailImage: "/event-detail-2.png" };
  }
  return { title: "이벤트 상세", detailImage: "/event-detail-3.png" };
};

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  // URL의 eventId 파라미터를 사용해 해당 이벤트 정보를 가져옵니다.
  const event = getEventDetails(params.eventId);

  return (
    <div>
      <SubPageHeader title={event.title} />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          {/* public 폴더에 event-detail-1.png 등 세로로 긴 상세 이미지를 넣어야 합니다. */}
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