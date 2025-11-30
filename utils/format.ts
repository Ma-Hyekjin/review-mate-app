// utils/format.ts
// 포맷팅 유틸리티 함수

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * 날짜를 상대 시간으로 포맷팅 (예: "3일 전", "1시간 전")
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns 상대 시간 문자열
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffDay > 0) {
    return `${diffDay}일 전`;
  } else if (diffHour > 0) {
    return `${diffHour}시간 전`;
  } else if (diffMin > 0) {
    return `${diffMin}분 전`;
  } else {
    return '방금 전';
  }
}

