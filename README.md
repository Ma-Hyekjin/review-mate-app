# 리뷰메이트 (ReviewMate)

### Simply, Quickly, Easily - 나를 너무 잘 아는 너

---

## 💡 제안 (Proposal)

'리뷰메이트(ReviewMate)'는 사용자의 고유한 문체를 학습하여 '나다운' 리뷰 초안을 생성하고, AI가 사용자의 선호도를 예측하여 최적의 결과물을 추천하는 초개인화 AI 텍스트 생성 보조 서비스이다. 온라인 리뷰 작성의 피로감, 대가성 리뷰로 인한 신뢰도 하락, 기존 AI 생성 텍스트의 어색함이라는 문제를 해결하여, 사용자가 **시간은 절약**하면서도 **진정성 있는('나다운')** 리뷰를 손쉽게 작성하도록 돕는 것을 목표로 한다.

본 프로젝트는 한양대학교 창업지원단 지원 대상으로 선정되었다. 초기 **`SwiftUI`** 기반 iOS 앱 기획에서 더 빠른 시장 검증과 플랫폼 확장성을 위해 **`Next.js`** 웹 애플리케이션으로 전략적으로 피벗하여 개발을 진행 중이다.

---

## 🏗️ 시스템 아키텍처 (System Architecture)

'리뷰메이트'는 다음과 같은 주요 구성 요소로 설계되었다:

1.  **Frontend (Next.js Web App):**
    * 사용자가 키워드 입력, 문체(페르소나) 샘플 제공, 생성된 리뷰 확인 및 커뮤니티 피드를 이용하는 메인 인터페이스.
    * `TypeScript`, `React`, `Tailwind CSS`를 사용하여 개발.
2.  **Backend (Next.js API Routes / Server Actions):**
    * 프론트엔드로부터 요청을 받아 AI 모델 API를 호출하고, 결과를 처리하여 반환.
    * 사용자 데이터, 페르소나, 커뮤니티 피드 등을 데이터베이스에 저장/관리.
3.  **AI Models (External APIs):**
    * **Text Generation:** `Clova LLM (HCX-003)` 및 `OpenAI API`를 활용하여 기본 리뷰 초안을 생성. (RAG 및 Few-shot 프롬프트 엔지니어링 적용)
4.  **Database (Vercel Postgres + Prisma):**
    * 사용자 정보, 페르소나(최대 3개), 생성된 리뷰, 커뮤니티 피드 데이터 등을 저장. `Prisma ORM`을 통해 관리.
5.  **Hosting (Vercel):**
    * `Next.js` 애플리케이션 배포 및 관리를 위해 Vercel 플랫폼을 사용.

---

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend:** `Next.js 14+ (App Router)`, `React`, `TypeScript`, `Tailwind CSS`
* **Backend:** `Next.js API Routes / Server Actions`, `Node.js`
* **Database:** `Vercel Postgres`, `Prisma ORM`
* **AI APIs:** `Clova LLM API (HCX-003)` / `OpenAI API`
* **AI Concepts:** RAG (Retrieval-Augmented Generation), Few-Shot Learning
* **Deployment:** `Vercel`
* **Design:** `Figma`
* 
---

## ✨ 주요 기능 및 개발 로드맵 (Features & Roadmap)

**[v3] 빠른 출시(퍼블리싱) 및 사용자 피드백 확보** 중심으로 MVP 계획을 수정.

### P1: 핵심 기능 구현 및 배포 (Core Feature & Deployment)

핵심 생성 기능 및 사용자 가입 플로우를 완성하고 배포.

* [x] **프로젝트 초기 설정**: Next.js (TS, Tailwind), Vercel Postgres + Prisma 환경 구성
* [x] **기본 UI/UX 디자인**: Figma 기반 핵심 페이지(로그인, 퀵픽, 메인) 디자인 완료
* [x] **핵심 UI 구현**: 로그인, 퀵픽(페르소나 생성), 메인 페이지, Nav 레이아웃 UI 구현 완료
* [x] **소셜 로그인**: `NextAuth.js`를 활용한 카카오/구글/네이버 로그인 연동
* [ ] **Vercel 배포**: Vercel 배포 및 소셜 로그인 리디렉션 URL 설정
* [ ] **[AI 연동] 기본 텍스트 생성**: `Clova/OpenAI API` 연동하여 키워드 기반 리뷰 초안 생성 기능 구현
* [ ] **[DB] 사용자 및 페르소나 저장**: 퀵픽 플로우에서 생성된 사용자 정보 및 페르소나(최대 3개) 저장

### P2: 페르소나 적용 및 고도화 (Persona Integration)

AI 생성 결과물에 사용자의 페르소나(문체)를 적용.

* [ ] **[AI] 개인화 프롬프트 적용**: 저장된 페르소나(성별, 나이, MBTI, 샘플 텍스트 등)를 AI 프롬프트에 동적으로 주입
* [ ] **[AI] RAG/Few-Shot 적용**: 사용자의 과거 리뷰 샘플(Details) 및 0순위 원칙을 RAG로 적용하여 '나다운' 텍스트 생성률 향상
* [ ] **UI/UX 개선**: 페르소나 전환(최대 3개) UI 및 생성된 리뷰 수정/저장 기능 구현

### P3: 핵심 소셜 기능 - 커뮤니티 (Core Social Feature - Community)

MVP의 핵심 소셜 기능인 '페르소나 공유 커뮤니티 피드'를 구현.

* [ ] **[커뮤니티] 피드 UI**: 다른 사용자가 공유한 페르소나(이름, 성향, 샘플 결과)를 볼 수 있는 피드 UI 구현
* [ ] **[커뮤니티] 공유 기능**: 자신의 페르소나를 피드에 공유(게시)하는 기능
* [ ] **[커뮤니티] 참고 기능**: 다른 사용자의 페르소나를 내 페르소나 슬롯에 복사(참고)하는 기능

### P4: 수익화 및 안정화 (Monetization & Stabilization)

서버 비용 충당을 위한 최소한의 수익 모델을 도입하고 서비스를 안정화.

* [ ] **광고 SDK 연동**: 배너 광고 및 보상형 광고(리뷰 생성 완료 후 선택적 시청) 도입
* [ ] **테스트 및 안정화**: 사용자 피드백 기반 버그 수정 및 성능 최적화
* [ ] **(Optional) PWA 런칭**: 웹 앱을 PWA(Progressive Web App)로 패키징하여 모바일 접근성 강화

---

## 🚀 시작하기 (Getting Started)

1.  **Clone the repository:**
    ```bash
    git clone [GITHUB_REPOSITORY_URL]
    cd review-mate-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Set up environment variables:** Create a `.env.local` file with DB connection strings, AI API keys etc.
4.  **Run Prisma commands:**
    ```bash
    npx prisma migrate dev # Apply migrations
    npx prisma generate # Generate Prisma Client
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```
6.  Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 👨‍💻 팀 (Team)

| Name (KOR) | Role                                  | Email                  | GitHub                                      |
| :--------- | :------------------------------------ | :--------------------- | :------------------------------------------ |
| 마혁진     | PM, AI Service Dev (Architecture, AI) | tema0311@naver.com     | [Ma-Hyekjin](https://github.com/Ma-Hyekjin) |
| 임수빈     | Fullstack Dev (Backend, Infra)        | s00been@hanyang.ac.kr  |
| 이수원     | UI/UX Designer                        | eggsun123@naver.com    |
