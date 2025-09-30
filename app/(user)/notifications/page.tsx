// app/(user)/notifications/page.tsx
"use client";

import SubPageHeader from "@/components/SubPageHeader";

// TODO: [DB] 실제 알림 데이터는 DB에서 불러와야 합니다.
const notificationsData = [
  { id: 1, message: "새로운 '친절한 리뷰어' 메이트가 마켓에 등록되었습니다.", timestamp: "1시간 전", read: false },
  { id: 2, message: "저장하신 '강남역 카페' 리뷰에 대한 메이트의 분석이 완료되었습니다.", timestamp: "5시간 전", read: false },
  { id: 3, message: "9월 월간 활동 리포트가 도착했습니다.", timestamp: "어제", read: true },
  { id: 4, message: "리뷰메이트에 오신 것을 환영합니다!", timestamp: "3일 전", read: true },
];

export default function NotificationsPage() {
  return (
    <div>
      <SubPageHeader title="알림" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          {notificationsData.length > 0 ? (
            <ul className="divide-y dark:divide-gray-700">
              {notificationsData.map(item => (
                <li key={item.id} className="flex items-start gap-4 py-4">
                  {/* 읽지 않은 알림 표시 */}
                  {!item.read && (
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500"></div>
                  )}
                  <div className={`flex-grow ${item.read ? 'pl-6' : ''}`}>
                    <p className="text-sm">{item.message}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-20 text-center text-gray-500">새로운 알림이 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}