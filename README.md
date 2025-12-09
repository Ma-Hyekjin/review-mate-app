# 리뷰메이트 (ReviewMate)

### Simply, Quickly, Easily - 나를 너무 잘 아는 너

---

## 아이템 소개

리뷰메이트(ReviewMate)는 LLM을 활용하여 사용자의 짧은 메모를 자연스러운 리뷰로 확장하고, 이를 기반으로 클린한 정보 공유 커뮤니티를 제공하는 서비스이다.

온라인 리뷰 작성의 피로감, 대가성 리뷰로 인한 신뢰도 하락, 기존 AI 생성 텍스트의 어색함이라는 문제를 해결하여, 사용자가 시간을 절약하면서도 진정성 있는 리뷰를 손쉽게 작성할 수 있도록 돕는다. 더 나아가 이러한 리뷰들이 모여 순수한 정보 공유의 장을 형성하고, 사용자 간 의견을 나누는 커뮤니티로 발전한다.

**웹사이트**: https://reviewmate-official.vercel.app

---

## 서비스 개요

ReviewMate는 사용자의 짧은 메모를 자연스러운 리뷰로 확장해주는 LLM 기반 리뷰 어시스턴트 서비스이다.

초기에는 개인 사용자를 위한 리뷰 자동화 도구로 시작했으나, 사용자 간의 피드백 데이터가 기업 의사결정에도 활용될 수 있다는 점에 주목했다.

현재는 "리뷰 생성"에서 나아가 리뷰 커뮤니티 → 데이터 인사이트 → B2B SaaS 솔루션으로 확장하는 방향으로 전환 중이다.

---

## 제품 방향성

### Phase 1 (v1) - 현재: LLM 기반 리뷰 자동화 및 문체 개인화

- 사용자의 페르소나(문체) 저장 및 관리
- LLM을 활용한 키워드 기반 리뷰 자동 생성
- Few-shot Learning 기반 프롬프트 엔지니어링으로 텍스트 품질 향상
- 사용자의 리뷰 생성 경험 개선

**현재 상태**: 완료 및 운영 중

---

### Phase 2 (v2) - 진행 예정: 리뷰 커뮤니티 기능 구축

- 사용자 간 리뷰 공유 및 피드백 순환 구조 설계
- 클린한 정보 공유의 장으로서 물건이나 서비스를 평가하고 서로 의견을 나누는 창구
- 건전한 소비자 경험과 리뷰 신뢰도 확보에 초점
- 사용자의 흥미나 관심도가 높은 아이템 파악 및 추천 시스템

**예상 기능**:
- 리뷰 피드 UI 및 공유 기능
- 페르소나 기반 리뷰 추천
- 카테고리별 리뷰 탐색
- 사용자 간 상호작용 (좋아요, 댓글 등)

---

### Phase 3 (v3) - 계획 중: B2B SaaS 확장

커뮤니티에서 발생하는 리뷰 데이터를 구조화하여 기업이 상품 트렌드, 소비자 인사이트, 공동구매 연계 등을 분석할 수 있는 리뷰 인텔리전스 솔루션으로 발전한다.

**핵심 가치**:
- 데이터 인사이트: 실시간 트렌드, 피드백, 제품 개선 인사이트 제공
- 공동구매 솔루션: 사용자 관심도 기반 파매 솔루션 연계
- B2B 대시보드: 기업용 분석 및 리포트 대시보드
- API 솔루션: 기업이 직접 활용할 수 있는 리뷰 데이터 API

**기술적 접근**:
- 리뷰 데이터 벡터화 및 검색 정확도 향상 (LangChain 실험 진행 예정)
- 구조화된 데이터 파이프라인 구축
- B2B 대시보드용 API 구조 설계

---

## 핵심 인사이트

단순한 '리뷰 생성기'가 아니라, "소비자 경험이 데이터로 순환되는 생태계"를 구축하는 것을 목표로 한다.

```
사용자 → 자연스러운 리뷰 작성 → 경험 기록
         ↓
    커뮤니티에서 공유 및 피드백 순환
         ↓
    구조화된 데이터로 변환
         ↓
기업 → 실시간 트렌드, 인사이트, 공동구매 연계
         ↓
    개선된 제품/서비스
         ↓
    더 나은 사용자 경험
```

양측 모두에게 가시적인 효용을 제공하는 연결 구조로 진화한다.

---

## 현재 집중 영역

- Phase 1 완료: LLM 기반 리뷰 자동화 및 문체 개인화 기능 구현 완료
- 커뮤니티 구조 설계: 사용자 데이터 스키마 및 피드 구조 설계 중
- B2B 대시보드 API 연구: 기업용 데이터 분석 API 구조 연구
- 리뷰 데이터 벡터화: LangChain을 활용한 검색 정확도 실험 진행 예정
- UI/UX 리뉴얼: SaaS 모델링을 고려한 디자인 시스템 설계 병행

---

## 폴더 구조

```
review-mate-app/
├── Web/                   # Next.js 웹 애플리케이션
│   ├── app/               # 페이지 및 API 라우트
│   ├── components/        # React 컴포넌트
│   ├── lib/               # 핵심 라이브러리 (API, DB, Auth, OpenAI)
│   ├── hooks/             # Custom React Hooks
│   ├── types/             # TypeScript 타입 정의
│   ├── prisma/            # 데이터베이스 스키마
│   └── public/            # 정적 파일
├── docs/                  # 프로젝트 문서
├── README.md
└── LICENSE
```

---

## 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel (Serverless)                  │
│                                                         │
│  ┌──────────────────┐         ┌──────────────────┐      │
│  │     Frontend     │         │      Backend     │      │
│  │                  │◄───────►│                  │      │
│  │      React       │   API   │      Node.js     │      │
│  │    TypeScript    │  Call   │                  │      │
│  │                  │         │                  │      │
│  └──────────────────┘         └────────┬─────────┘      │
│                                        │                │
│                                        │  Prisma ORM    │
│                                        ▼                │
│                                  ┌──────────────┐       │
│                                  │  PostgreSQL  │       │
│                                  │  (Vercel DB) │       │
│                                  └──────────────┘       │
└─────────────────────────────────────────────────────────┘
                            │
                            │ API Calls
                            │◄─────────┐
                            ▼          │
                  ┌─────────────────┐  │
                  │   OpenAI API    │  │
                  │   (GPT-4o)      │──┘
                  └─────────────────┘
```

**기술 스택**:
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js (Next.js API Routes)
- **Database**: PostgreSQL (Vercel Postgres)
- **Hosting**: Vercel (Serverless Architecture)
- **External**: OpenAI API (GPT-4o)

---

## 설치 방법

### 1. 저장소 클론

```bash
git clone https://github.com/HyeokjinMa/review-mate-app.git
cd review-mate-app
```

### 2. Web 폴더로 이동 및 의존성 설치

```bash
cd Web
npm install
```

### 3. 환경 변수 설정

`Web` 폴더에 `.env.local` 파일을 생성하고, Vercel 대시보드에서 환경 변수들을 가져온다.

```bash
cd Web
vercel env pull .env.local
```

또는 수동으로 `.env.local` 파일을 생성하고 다음 환경 변수들을 설정한다:

```env
DATABASE_URL="your_database_url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
OPENAI_API_KEY="your_openai_api_key"
# 소셜 로그인 관련 변수들 (KAKAO, GOOGLE, NAVER)
```

> [!IMPORTANT]
> 로컬 개발 시 `NEXTAUTH_URL`은 **`http://localhost:3000`** 으로 설정되어 있어야 한다.

### 4. Prisma 설정

```bash
# (최초 또는 스키마 리셋 시)
npx prisma migrate reset

# (스키마 변경 시)
npx prisma migrate dev --name "migration_name"

# (클라이언트 갱신)
npx prisma generate
```

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인한다.

---

## 팀

| Name (KOR) | Role                                  | Email                  | GitHub                                      |
| :--------- | :------------------------------------ | :--------------------- | :------------------------------------------ |
| 마혁진     | PM, AI Service Dev (Architecture, AI) | tema0311@naver.com     | [HyeokjinMa](https://github.com/HyeokjinMa) |
| 임수빈     | Fullstack Dev (Backend, Infra)        | s00been@hanyang.ac.kr  |                                             |
| 이수원     | UI/UX Designer                        | eggsun123@naver.com    |                                             |
