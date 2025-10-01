// app/(user)/events/[eventId]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

// 타입 정의는 기존과 같이 명확하게 유지합니다.
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

// 페이지 컴포넌트를 async 함수로 변경합니다.
export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = getEventDetails(params.eventId);

  return (
    <div>
      <header className="relative flex h-14 items-center justify-center border-b dark:border-gray-700">
        <Link href="/events" className="absolute left-4 p-2">
          <FaChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-semibold">{event.title}</h1>
      </header>
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