// app/(user)/mypage/events/page.tsx
"use client";

import SubPageHeader from "@/components/SubPageHeader";
import Image from "next/image";
import Link from "next/link";

// TODO: [DB] 실제로는 DB나 CMS(콘텐츠 관리 시스템)에서 이벤트 목록을 '불러와야(fetch)' 합니다.
const eventsData = [
  {
    id: 1,
    title: "리뷰메이트 출시 기념 이벤트!",
    bannerImage: "/event-banner-1.png",
  },
  {
    id: 2,
    title: "친구 초대하고 혜택 받자!",
    bannerImage: "/event-banner-2.png",
  },
  {
    id: 3,
    title: "새로운 페르소나 업데이트 안내",
    bannerImage: "/event-banner-3.png",
  },
];

export default function EventsPage() {
  return (
    <div>
      <SubPageHeader title="이벤트" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          {/* TODO: [UI/UX] 진행 중인 이벤트가 없을 때 보여줄 '비어있는 상태(Empty State)' UI가 필요합니다. */}
          <div className="space-y-4">
            {eventsData.map((event) => (
              <Link href={`/mypage/events/${event.id}`} key={event.id}>
                <div className="group relative aspect-[2/1] w-full cursor-pointer overflow-hidden rounded-lg">
                  {/* public 폴더에 event-banner-1.png 등 임시 배너 이미지를 넣어야 합니다. */}
                  <Image
                    src={event.bannerImage}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}