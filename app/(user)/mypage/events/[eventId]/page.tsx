// app/(user)/mypage/events/[eventId]/page.tsx
// 여기는 이제 Server Component 입니다. "use client"를 제거합니다.

import EventDetailClientPage from "./EventDetailClientPage"; // 2단계에서 만들 클라이언트 컴포넌트

// PageProps 타입 정의
interface EventDetailPageProps {
  params: { eventId: string };
}

// 페이지 컴포넌트는 async 함수가 됩니다.
export default async function EventDetailPage({ params }: EventDetailPageProps) {
  // params에서 eventId를 직접 추출합니다.
  const { eventId } = params;

  // 추출한 eventId를 클라이언트 컴포넌트에 prop으로 전달합니다.
  return <EventDetailClientPage eventId={eventId} />;
}