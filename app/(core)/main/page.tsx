// app/(core)/main/page.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
// import { Si... } // 이전 아이콘들 제거

// TODO: 이 타입은 나중에 사진 '업로드' 로직에 필요하므로 유지합니다.
interface SelectedImage {
  file: File;
  previewUrl: string;
}

export default function MainPage() {
  const [inputText, setInputText] = useState("");
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateClick = () => {
    // TODO: 3단계 - AI API 연동
    console.log("생성할 리뷰 원문:", inputText);
    console.log("첨부된 사진 파일:", selectedImages.map((img) => img.file));
    alert("AI 생성 로직을 여기에 연결할 차례입니다!");
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-8.5rem)] flex-col justify-between w-full">
        <div className="flex flex-col items-center gap-20 pt-20 text-center">
          <h1 className="text-title-md font-bold">
            <span className="bg-gradient-light bg-clip-text text-transparent">
              만나서 반가워요!
            </span>
          </h1>
          <p className="text-caption text-gray-5">
            리뷰메이트와 함께하는 리뷰 생활 시작해봐요!
          </p>
        </div>
        {/*프롬포트 입력창*/}
        <div className="w-full rounded-t-3xl border-t border-blue-light-200 bg-background p-6 shadow-[0px_4px_15px_blue-light-200] flex flex-col justify-between h-[40vh]">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="강남역, 분위기 좋은, 산미가 있는 커피"
            rows={5}
            className="w-full resize-none border-none bg-transparent p-2 text-caption text-gray-6 placeholder-gray-4 focus:outline-none focus:ring-0 dark:text-gray-3 dark:placeholder-gray-4 flex-grow"
          />
          {selectedImages.length > 0 && (
            <div className="my-2 flex space-x-2 overflow-x-auto p-1">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative shrink-0">
                  <Image
                    src={image.previewUrl}
                    alt={`preview ${index}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -right-1 -top-1 rounded-full bg-white text-gray-700"
                  >
                    {/* TODO: 이 아이콘도 SVG로 교체하면 좋습니다 (예: X 아이콘) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="relative mt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-[100px] left-[20px] flex h-[50px] w-[108px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-background text-caption font-medium text-gray-3 transition hover:bg-blue-light-100"
            >
              <Image
                src="/assets/icons/camera.svg"
                width={22}
                height={18}
                alt="사진첨부"
              />
              사진첨부
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              onClick={handleGenerateClick}
              className="absolute bottom-[30px] right-[20px] flex h-[50px] w-[110px] items-center justify-center gap-2 rounded-[100px] border border-blue-light-100 bg-blue-light-100 text-caption font-medium text-primary-light transition hover:bg-blue-light-200"
            >
              <Image
                src="/assets/icons/generate.svg"
                width={20}
                height={20}
                alt="생성하기"
              />
              생성하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}