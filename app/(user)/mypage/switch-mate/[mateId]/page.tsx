// app/(user)/mypage/switch-mate/[mateId]/page.tsx
// 서버 컴포넌트 역할을 합니다.

import MateDetailClientPage from "./MateDetailClientPage";

// PageProps 타입을 Next.js 15의 기대에 맞게 Promise로 감싸줍니다.
interface MateDetailPageProps {
  params: Promise<{ mateId: string }>;
}

// 페이지 컴포넌트는 async 함수여야 합니다.
export default async function MateDetailPage({ params }: MateDetailPageProps) {
  // await를 사용해 Promise에서 실제 params 객체를 추출합니다.
  const { mateId } = await params;

  // 추출한 mateId를 클라이언트 컴포넌트에 prop으로 전달합니다.
  return <MateDetailClientPage mateId={mateId} />;
}