// app/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
// [필수] NextAuth 설정과 Prisma 클라이언트를 가져옵니다.
import { authOptions } from '@/lib/authOptions'; 
import db from '@/lib/db'; 

// 서버 컴포넌트
export default async function HomePage() {
  
  // 1. 세션 정보 확인
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    // 2. 로그인되어 있지 않으면 로그인 페이지로 이동 (NextAuth가 처리)
    // NextAuth의 기본 동작을 따르거나, 특정 로그인 경로로 리디렉션
    redirect('/login');
  }
  
  const userId = session.user.id;
  
  try {
    // 3. 로그인된 사용자에게 저장된 Mate 개수 확인
    const mateCount = await db.mate.count({
      where: { userId: userId },
    });
    
    // 4. 메이트 유무에 따른 분기 처리
    if (mateCount === 0) {
      // 메이트가 없으면 퀵픽 페이지로 이동
      redirect('/quick-pick');
    } else {
      // 메이트가 있으면 메인 페이지로 이동
      redirect('/main');
    }

  } catch (error) {
    console.error("DB 조회 오류:", error);
    // 5. 오류 발생 시 임시로 로그인 페이지로 이동 (또는 오류 페이지)
    redirect('/login');
  }
  
  // 로직이 리디렉션되지 않았을 경우를 대비한 최소한의 UI
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary-light">ReviewMate</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
    </main>
  );
}