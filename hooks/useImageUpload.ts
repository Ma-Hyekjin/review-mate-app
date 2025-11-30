// hooks/useImageUpload.ts
// 이미지 업로드 및 미리보기 관련 커스텀 훅

import { useState, useRef, useCallback } from "react";
import type { SelectedImage } from "@/types";

/**
 * 이미지 업로드 및 미리보기 관리 커스텀 훅
 */
export function useImageUpload() {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 이미지 선택 핸들러
   */
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const selectedImage: SelectedImage = {
        file,
        previewUrl: URL.createObjectURL(file),
      };
      setSelectedImages([selectedImage]);
    }
    // 입력 필드 초기화
    if (e.target.files) e.target.value = '';
  }, []);

  /**
   * 이미지 제거
   */
  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      // 메모리 정리: 제거된 이미지의 URL 해제
      const removedImage = prev[index];
      if (removedImage?.previewUrl) {
        URL.revokeObjectURL(removedImage.previewUrl);
      }
      return newImages;
    });
  }, []);

  /**
   * 모든 이미지 제거
   */
  const clearImages = useCallback(() => {
    selectedImages.forEach((img) => {
      if (img.previewUrl) {
        URL.revokeObjectURL(img.previewUrl);
      }
    });
    setSelectedImages([]);
  }, [selectedImages]);

  /**
   * 파일 입력 필드 열기
   */
  const openFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    selectedImages,
    fileInputRef,
    handleImageChange,
    removeImage,
    clearImages,
    openFileInput,
  };
}

