# 트러블슈팅 가이드

이 문서는 리뷰메이트 프로젝트 개발 중 발생한 주요 문제들과 해결 방법을 정리한 것입니다.

---

## 1. Prisma 스키마 변경 후 마이그레이션 누락

### 문제 상황
- `Mate` 모델에 `isDefault` 필드를 추가했지만 TypeScript 타입 에러 발생
- 에러 메시지: `'isDefault' does not exist in type 'MateWhereInput'`

### 원인
- Prisma 스키마(`schema.prisma`)는 수정했지만 데이터베이스 마이그레이션을 실행하지 않음
- Prisma Client가 아직 업데이트되지 않은 상태

### 해결 방법
```bash
npx prisma migrate dev --name add_is_default_to_mate
```

또는 개발 환경에서:
```bash
npx prisma generate
npx prisma db push
```

### 예방 방법
- 스키마 변경 후 항상 마이그레이션 실행
- CI/CD 파이프라인에 마이그레이션 단계 포함

---

## 2. API 응답 형식 불일치

### 문제 상황
- 각 API 엔드포인트마다 응답 형식이 다름
- 프론트엔드에서 일관성 없는 데이터 처리 필요
- 타입 안전성 저하

### 원인
- API 응답 형식에 대한 표준이 없음
- 각 개발자가 다른 형식으로 응답 생성

### 해결 방법
**1. 공통 응답 헬퍼 함수 생성** (`lib/api-response.ts`)
```typescript
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse {
  return NextResponse.json(
    {
      data,
      ...(message && { message }),
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  status: number = 400,
  error?: string
): NextResponse {
  return NextResponse.json(
    {
      error: error || message,
      message,
    },
    { status }
  );
}
```

**2. 타입 정의** (`types/api.ts`)
```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
}
```

**3. 모든 API 라우트에 적용**
- `app/api/generate/route.ts`
- `app/api/mate/route.ts`
- `app/api/reviews/save/route.ts`
- `app/api/reviews/route.ts`

### 결과
- 모든 API가 `{ data: T, message?: string }` 형식으로 통일
- 프론트엔드에서 일관된 데이터 처리 가능
- 타입 안전성 향상

---

## 3. 인증 로직 중복

### 문제 상황
- 모든 API 라우트에서 동일한 인증 로직 반복
- 코드 중복 및 유지보수 어려움

### 해결 방법
**인증 헬퍼 함수 생성** (`lib/auth-helpers.ts`)
```typescript
export async function requireAuth(): Promise<AuthResult> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw errorResponse('인증되지 않은 사용자입니다.', 401);
  }
  return {
    userId: session.user.id,
    session: session as NonNullable<typeof session>,
  };
}
```

**사용 예시**
```typescript
export async function POST(request: Request) {
  try {
    const { userId } = await requireAuth();
    // ... 나머지 로직
  } catch (error) {
    if (error instanceof NextResponse) return error;
    // ... 에러 처리
  }
}
```

### 결과
- 인증 로직 중복 제거
- 코드 가독성 및 유지보수성 향상

---

## 4. Quick-pick 페이지 반복 표시 문제

### 문제 상황
- 로그인할 때마다 퀵픽 페이지가 나타남
- 사용자가 이미 메이트를 생성했는데도 계속 퀵픽으로 리다이렉트

### 원인
- `app/page.tsx`에서 전체 메이트 개수를 확인
- 기본 메이트(`isDefault: true`)도 카운트에 포함되어 항상 1개 이상 존재
- 사용자가 생성한 메이트가 없어도 기본 메이트 때문에 퀵픽으로 가지 않음

### 해결 방법
**사용자가 생성한 메이트만 카운트**
```typescript
// app/page.tsx
const userCreatedMateCount = await db.mate.count({
  where: {
    userId: userId,
    isDefault: false, // 기본 메이트 제외
  },
});

if (userCreatedMateCount === 0) {
  redirect('/quick-pick');
} else {
  redirect('/main');
}
```

### 결과
- 기본 메이트는 자동 생성되지만 퀵픽 플로우에 영향 없음
- 사용자가 메이트를 생성한 경우에만 메인 페이지로 이동

---

## 5. NextAuth 에러 처리 및 Suspense 경계

### 문제 상황
1. **빌드 에러**: `useSearchParams` 사용 시 Next.js 15에서 빌드 실패
2. **런타임 에러**: 로그인 시 일시적으로 빨간 에러 표시가 나타났다가 사라짐

### 원인
1. `useSearchParams`는 클라이언트 컴포넌트에서만 사용 가능하며 Suspense 경계 필요
2. NextAuth 에러가 URL 파라미터로 전달되지만 처리하지 않음

### 해결 방법
**1. Suspense 경계 추가**
```typescript
// app/(auth)/login/page.tsx
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
```

**2. NextAuth 에러 처리**
```typescript
function LoginForm() {
  const searchParams = useSearchParams();
  const [errorShown, setErrorShown] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error && !errorShown) {
      setErrorShown(true);
      const errorMessages: Record<string, string> = {
        'Configuration': '서버 설정 오류가 발생했습니다.',
        'AccessDenied': '접근이 거부되었습니다.',
        'Verification': '인증 오류가 발생했습니다.',
        'Default': '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
      };
      const message = errorMessages[error] || errorMessages['Default'];
      showError(message);
    }
  }, [searchParams, errorShown]);
  
  // ... 나머지 코드
}
```

### 결과
- 빌드 에러 해결
- 사용자 친화적인 에러 메시지 표시
- 일시적인 빨간 에러 표시 제거

---

## 6. SharePopup 디자인 및 레이아웃 문제

### 문제 상황
1. 데스크탑에서 팝업이 전체 화면으로 표시됨
2. 플랫폼 아이콘이 매칭되지 않음
3. 텍스트 정렬이 중앙이 아님
4. 배경 오버레이가 너무 어두움
5. 팝업 높이가 하단 네비게이션을 고려하지 않음

### 해결 방법
**1. 반응형 크기 및 중앙 정렬**
```typescript
<div
  className="fixed bottom-[80px] bg-white rounded-t-3xl z-[101] shadow-2xl"
  style={{
    width: '100%',
    maxWidth: '375px', // 모바일 최대 너비
    left: '50%',
    transform: 'translateX(-50%)', // 중앙 정렬
    height: 'calc(65vh - 80px)', // 하단 네비게이션 고려
    maxHeight: 'calc(65vh - 80px)',
  }}
>
```

**2. react-icons 사용**
```typescript
import { SiNaver, SiGooglemaps } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

const PLATFORMS = [
  { id: 'naver-map', name: '네이버지도', icon: SiNaver, color: '#03C75A' },
  { id: 'kakao-map', name: '카카오맵', icon: RiKakaoTalkFill, color: '#FEE500' },
  { id: 'google-map', name: '구글맵', icon: SiGooglemaps, color: '#4285F4' },
];
```

**3. 텍스트 중앙 정렬 및 배경 투명도 조정**
```typescript
<div className="text-center">텍스트 공유</div>
<div className="bg-black/30"> {/* 기존: bg-black/50 */}
```

### 결과
- 모바일 기준(375px)으로 제한된 팝업 크기
- 정확한 플랫폼 아이콘 표시
- 중앙 정렬된 텍스트
- 적절한 배경 투명도
- 하단 네비게이션을 고려한 높이

---

## 7. 스크롤 동작 문제

### 문제 상황
1. 리뷰 텍스트가 길어지면 버튼이 가려짐
2. 텍스트 박스와 페이지 전체 모두 스크롤됨

### 원인
- 텍스트 박스 높이가 고정되지 않음
- 페이지 전체에 `overflow-y-auto` 적용

### 해결 방법
**1. 텍스트 박스 높이 고정 및 내부 스크롤**
```typescript
// components/features/main/MainResultView.tsx
<div 
  style={{
    height: 146, // 6줄 고정
    maxHeight: 146,
    overflowY: 'auto', // 내부만 스크롤
    overflowX: 'hidden',
  }}
>
  {generatedReview}
</div>
```

**2. 페이지 전체 스크롤 제거**
```typescript
// app/(core)/main/page.tsx
<div className="flex-1 overflow-hidden pb-[119px]"> {/* 기존: overflow-y-auto */}
```

### 결과
- 텍스트 박스만 스크롤되고 버튼은 항상 보임
- 페이지 전체 스크롤 제거
- 사용자 경험 개선

---

## 8. 애니메이션 및 CSS 관리

### 문제 상황
- `SharePopup` 컴포넌트에 인라인 스타일로 애니메이션 정의
- 재사용성 및 유지보수 어려움

### 해결 방법
**전역 CSS로 애니메이션 이동** (`app/globals.css`)
```css
@keyframes slideUp {
  from {
    transform: translateY(100%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

**컴포넌트에서 사용**
```typescript
<div style={{ animation: 'slideUp 0.3s ease-out' }}>
```

### 결과
- 애니메이션 재사용 가능
- CSS 관리 일원화
- 유지보수성 향상

---

## 9. 타입 에러 및 호환성 문제

### 문제 상황
- `ApiResponse` 타입이 일부 파일에서 인식되지 않음
- `SaveReviewResponseData` vs `SaveReviewResponse` 혼용

### 해결 방법
**1. 타입 정의 통일** (`types/api.ts`)
```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface SaveReviewResponseData {
  id: string;
}

// Legacy 호환성
export interface SaveReviewResponse {
  id: string;
  message: string;
}
```

**2. 모든 파일에서 일관된 타입 사용**
- `hooks/useReview.ts`: `ApiResponse<GenerateReviewResponse>`
- `hooks/useMate.ts`: `ApiResponse<GetMatesResponse>`
- `app/(core)/main/page.tsx`: `ApiResponse<SaveReviewResponseData>`

### 결과
- 타입 안전성 확보
- 일관된 API 응답 처리

---

## 10. 더미 데이터로 인한 리뷰 품질 문제

### 문제 상황
- 생성된 리뷰가 형식적이고 부자연스러움
- 더미 데이터의 스타일이 그대로 반영됨

### 해결 방법
**더미 데이터를 자연스러운 리뷰로 교체** (`constants/reviewExamples.ts`)
- 기존: 형식적이고 반복적인 리뷰
- 변경: 다양한 문체와 자연스러운 표현의 리뷰 20개

### 결과
- 생성된 리뷰의 자연스러움 향상
- 다양한 문체 학습 가능

---

## 일반적인 문제 해결 체크리스트

### 빌드 에러 발생 시
1. [ ] Prisma 스키마 변경 후 `npx prisma generate` 실행
2. [ ] `.next` 폴더 삭제 후 재빌드
3. [ ] `node_modules` 삭제 후 `npm install` 재실행
4. [ ] TypeScript 타입 에러 확인

### 런타임 에러 발생 시
1. [ ] 브라우저 콘솔 에러 확인
2. [ ] 서버 로그 확인 (`lib/logger.ts` 사용)
3. [ ] API 응답 형식 확인
4. [ ] 인증 상태 확인 (`requireAuth()` 사용 여부)

### UI 문제 발생 시
1. [ ] Tailwind CSS 클래스 확인
2. [ ] 인라인 스타일과 클래스 충돌 확인
3. [ ] 반응형 디자인 확인 (모바일/데스크탑)
4. [ ] z-index 레이어 확인

---

**작성일**: 2024년  
**최종 업데이트**: 스크롤 동작 문제 해결 완료

