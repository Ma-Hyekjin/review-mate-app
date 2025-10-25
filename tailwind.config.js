// tailwind.config.js 

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 스캔할 파일 경로 설정 (src 없이 app 폴더 사용 기준)
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // 클래스 기반 다크 모드 활성화
  darkMode: 'class',
  theme: {
    // 기본 테마 확장
    extend: {
      colors: {
        // CSS 변수 사용 (globals.css에서 정의)
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',

        // 특정 모드 색상 직접 참조 (선택적)
        'primary-light': '#00A0E0',
        'blue-light': {
          100: '#E6FCFF', 200: '#7AE7FF', 300: '#50D5FA', 400: '#26BBED', 500: '#00A0E0',
        },
        'primary-dark': '#076F99',
        'blue-dark': {
          100: '#111F27', 200: '#0F2F3E', 300: '#0E3E51', 400: '#0B5370', 500: '#076F99',
        },

        // 그레이 스케일 (9단계)
        gray: {
          1: '#F5F5F5', 2: '#EEEEEE', 3: '#E0E0E0', 4: '#D5D5D5', 5: '#A9A9B0',
          6: '#8D8D99', 7: '#3F4045', 8: '#222327', 9: '#12121E',
        },
        // 그레이 스케일 역순 (선택적)
        'gray-rev': {
          1: '#12121E', 2: '#222327', 3: '#3F4045', 4: '#8D8D99', 5: '#A9A9B0',
          6: '#D5D5D5', 7: '#E0E0E0', 8: '#EEEEEE', 9: '#F5F5F5',
        },

        // Static 컬러
        black: '#000000',
      },
      fontFamily: {
        // 글꼴 설정 (Spoqa는 CDN으로 로드, Geist Mono는 CSS 변수 사용)
        sans: ['Spoqa Han Sans Neo', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // 글자 크기 정의 ([fontSize, lineHeight])
        'caption': ['16px', '150%'],
        'body': ['24px', '150%'],
        'title-sm': ['22px', '150%'], // Mobile Title Medium
        'title-md': ['28px', '150%'], // Desktop Title Medium
        'title-lg': ['38px', '150%'], // Desktop & Mobile Title Bold
      },
      fontWeight: {
        // 글자 굵기 정의
        regular: '400',
        medium: '500',
        bold: '700',
      },
      spacing: {
        // 커스텀 간격 정의 (필요시)
        // '3': '12px', '6': '24px'
      },
      backgroundImage: {
        // 그라데이션 정의 (CSS 변수 사용)
        'gradient-light': 'linear-gradient(to right, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end-light))',
        'gradient-dark': 'linear-gradient(to right, var(--color-gradient-start-dark, var(--color-gradient-start)), var(--color-gradient-mid-dark, var(--color-gradient-mid)), var(--color-gradient-end-dark))',
      },
    },
  },
  // 플러그인 (필요시 추가)
  plugins: [],
};