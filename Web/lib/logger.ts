// lib/logger.ts
// 구조화된 로깅 시스템

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * 정보 로그
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, context || '');
    }
    // 프로덕션에서는 필요시 외부 로깅 서비스로 전송
  }

  /**
   * 경고 로그
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context || '');
    }
    // 프로덕션에서는 필요시 외부 로깅 서비스로 전송
  }

  /**
   * 에러 로그
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error: error instanceof Error 
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    };

    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, errorContext);
    } else {
      // 프로덕션에서는 에러 추적 서비스로 전송 (예: Sentry)
      console.error(`[ERROR] ${message}`, errorContext);
    }
  }

  /**
   * 디버그 로그 (개발 환경에서만)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }
}

// 싱글톤 인스턴스
export const logger = new Logger();

// 편의 함수들
export const logInfo = (message: string, context?: LogContext) => logger.info(message, context);
export const logWarn = (message: string, context?: LogContext) => logger.warn(message, context);
export const logError = (message: string, error?: Error | unknown, context?: LogContext) => 
  logger.error(message, error, context);
export const logDebug = (message: string, context?: LogContext) => logger.debug(message, context);

export default logger;

