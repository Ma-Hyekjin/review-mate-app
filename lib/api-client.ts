// lib/api-client.ts
// 공통 API 클라이언트 (fetch 래퍼)

import { logError } from "./logger";

export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}

export class ApiClientError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  skipErrorLog?: boolean;
}

/**
 * 공통 API 클라이언트
 */
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL || "";
  }

  /**
   * 공통 fetch 래퍼
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { skipErrorLog = false, ...fetchOptions } = options;

    const url = endpoint.startsWith("http") ? endpoint : `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      });

      // 응답이 성공적이지 않으면 에러 처리
      if (!response.ok) {
        let errorMessage = `요청 실패: ${response.status}`;
        let errorData: unknown;

        try {
          errorData = await response.json();
          if (typeof errorData === "object" && errorData !== null) {
            const data = errorData as { message?: string; error?: string };
            errorMessage = data.message || data.error || errorMessage;
          }
        } catch {
          // JSON 파싱 실패 시 텍스트로 시도
          try {
            const text = await response.text();
            if (text) errorMessage = text;
          } catch {
            // 무시
          }
        }

        const error = new ApiClientError(errorMessage, response.status, errorData);
        
        if (!skipErrorLog) {
          logError("API 요청 실패", error, { endpoint, status: response.status });
        }

        throw error;
      }

      // 응답 본문이 없으면 빈 객체 반환
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      // 네트워크 에러 처리
      if (error instanceof TypeError && error.message.includes("fetch")) {
        const networkError = new ApiClientError(
          "네트워크 연결을 확인해주세요.",
          0
        );
        
        if (!skipErrorLog) {
          logError("네트워크 오류", networkError, { endpoint });
        }

        throw networkError;
      }

      // 이미 ApiClientError면 그대로 throw
      if (error instanceof ApiClientError) {
        throw error;
      }

      // 기타 에러
      const unknownError = new ApiClientError(
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        0
      );

      if (!skipErrorLog) {
        logError("알 수 없는 API 오류", unknownError, { endpoint });
      }

      throw unknownError;
    }
  }

  /**
   * GET 요청
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  /**
   * POST 요청
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT 요청
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE 요청
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

// 싱글톤 인스턴스
export const apiClient = new ApiClient();

export default apiClient;

