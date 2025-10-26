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
    * 사용자가 키워드 입력, 문체 샘플 제공, 생성된 리뷰 확인 및 피드백을 제공하는 메인 인터페이스.
    * `TypeScript`, `React`, `Tailwind CSS`를 사용하여 개발.
2.  **Backend (Next.js API Routes / Server Actions):**
    * 프론트엔드로부터 요청을 받아 AI 모델 API를 호출하고, 결과를 처리하여 반환.
    * 사용자 데이터, 문체 벡터, 피드백 등을 데이터베이스에 저장/관리.
3.  **AI Models (External APIs & Custom Logic):**
    * **Text Generation:** `Clova LLM` (초기) 또는 `OpenAI API` (Fine-tuning 고려)를 활용하여 기본 리뷰 초안을 생성.
    * **Style Learning (Few-Shot):** 사용자 텍스트 샘플 분석 및 벡터화 로직 (구현 예정).
    * **Optimization (RLHF Concept):** 사용자 피드백(선택/수정/재생성)을 기반으로 최적 결과물을 추천하는 로직 (초기: `DQN Ranking` 모델 설계).
4.  **Database (Vercel Postgres + Prisma):**
    * 사용자 정보, 학습된 문체 데이터, 생성된 리뷰, 피드백 데이터 등을 저장. `Prisma ORM`을 통해 관리.
5.  **Hosting (Vercel):**
    * `Next.js` 애플리케이션 배포 및 관리를 위해 Vercel 플랫폼을 사용.

---

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend:** `Next.js 14+ (App Router)`, `React`, `TypeScript`, `Tailwind CSS`, `Shadcn/ui`
* **Backend:** `Next.js API Routes / Server Actions`, `Node.js`
* **Database:** `Vercel Postgres`, `Prisma ORM`
* **AI APIs:** `Clova LLM API` / `OpenAI API`
* **AI Concepts/Libraries:** Few-Shot Learning, RLHF (DQN Ranking - Design Phase), (Potentially) Vector DB for style embeddings
* **Deployment:** `Vercel`
* **Design:** `Figma`

---

## ✨ 주요 기능 및 개발 로드맵 (Features & Roadmap)

단계별 목표 달성을 통해 서비스를 출시하고 고도화.

### P1: MVP - 핵심 생성 및 학습 기반 구축 (Core Generation & Learning Foundation)

AI 기반 텍스트 생성 및 사용자 피드백 수집 기능을 구현.

* [x] **프로젝트 초기 설정**: Next.js (TS, Tailwind), Vercel Postgres + Prisma 환경 구성
* [x] **기본 UI/UX 디자인**: Figma 기반 핵심 페이지 디자인 완료 (by Designer)
* [x] **기본 UI 구현**: 로그인, 회원가입, 메인 텍스트 생성 페이지 UI 구현 (`Shadcn/ui` 활용)
* [ ] **[AI 연동] 기본 텍스트 생성**: `Clova/OpenAI API` 연동하여 키워드 기반 리뷰 초안 생성 기능 구현
* [ ] **[DB] 사용자 및 생성 데이터 저장**: 사용자 정보, 생성된 리뷰 텍스트 기본 저장 (Prisma)
* [ ] **[피드백] 리뷰 선택/재생성**: 사용자가 생성된 리뷰 중 하나를 선택하거나 재생성 요청하는 기능 구현 및 피드백 DB 저장

### P2: 초개인화 엔진 구현 및 서비스 안정화 (Hyper-personalization Engine & Stabilization)

문체 학습 및 최적 추천 기능을 구현하고 서비스를 안정화.

* [ ] **[AI] 문체 학습 (Few-Shot) 구현**: 사용자 제공 텍스트 샘플 분석 및 특징 벡터화/저장 로직 개발
* [ ] **[AI] 개인화 프롬프트 적용**: 학습된 문체 특징을 LLM 프롬프트에 동적으로 주입하여 '나다운' 텍스트 생성률 향상
* [ ] **[AI] 최적 리뷰 추천 (DQN Ranking - 초기)**: 수집된 피드백 기반으로 DQN 랭킹 모델 설계 및 기본 추천 로직 구현 (초기: Rule-based or Simple Model)
* [ ] **UI/UX 개선**: 디자이너와 협업하여 사용자 피드백 기반 UI/UX 개선
* [ ] **테스트 및 안정화**: 단위/통합 테스트 코드 작성, 버그 수정 및 성능 최적화

### P3: 기능 확장 및 수익화 (Feature Expansion & Monetization)

마켓플레이스, 구독 모델 등 부가 기능을 구현하고 수익 모델을 도입.

* [ ] **마켓플레이스 기능**: 사용자들이 생성/공유한 '스타일 프리셋' 거래 기능 기획 및 개발
* [ ] **B2C 구독 모델**: Freemium 기반 유료 구독 기능 (결제 시스템 연동) 개발
* [ ] **기능 확장**: 지원 텍스트 종류 확대 (리뷰 외 블로그 포스팅, SNS 게시글 등)
* [ ] **B2B SaaS 모델 기획**: 기업용 CS 응대 솔리션 등 B2B 모델 구체화
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
| 임수빈     | Fullstack Dev (Backend, Infra)        | (Team member's email)  | (Team member's GitHub)                      |
| 이수원     | UI/UX Designer                        | (Team member's email)  | (Team member's Portfolio/GitHub)          |
