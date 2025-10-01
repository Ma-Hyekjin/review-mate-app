// app/(user)/events/[eventId]/page.tsx
"use client";

import SubPageHeader from "@/components/SubPageHeader";
import Image from "next/image";

// 타입을 더 명확하게 정의하기 위해 interface를 사용합니다.
interface EventDetailPageProps {
  params: { eventId: string };
}

// TODO: [DB] 실제로는 params.eventId를 사용해 DB에서 해당 이벤트의 상세 정보를 불러와야 합니다.
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

// 컴포넌트가 받을 props 타입을 위에서 만든 interface로 지정합니다.
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

// 최종 수정