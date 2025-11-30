// app/(user)/mypage/events/[eventId]/page.tsx

import EventDetailClientPage from "@/components/features/events/EventDetailClientPage";

// PageProps 타입을 Next.js 15의 기대에 맞게 Promise로 감싸줍니다.
interface EventDetailPageProps {
  params: Promise<{ eventId: string }>;
}

// 페이지 컴포넌트는 async 함수여야 합니다.
export default async function EventDetailPage({ params }: EventDetailPageProps) {
  // await를 사용해 Promise에서 실제 params 객체를 추출합니다.
  const { eventId } = await params;

  // 추출한 eventId를 클라이언트 컴포넌트에 prop으로 전달합니다.
  return <EventDetailClientPage eventId={eventId} />;
}