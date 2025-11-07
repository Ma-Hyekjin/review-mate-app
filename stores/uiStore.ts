// stores/uiStore.ts
import { create } from 'zustand';

// 1. 스토어의 상태(State)와 액션(Actions) 타입을 정의합니다.
interface UiState {
  isKeyboardOpen: boolean;
  setKeyboardOpen: (isOpen: boolean) => void;
}

// 2. 스토어를 생성합니다.
export const useUiStore = create<UiState>((set) => ({
  // 3. 기본 상태 (키보드가 닫혀있음)
  isKeyboardOpen: false,
  
  // 4. 상태를 변경하는 액션
  setKeyboardOpen: (isOpen) => set({ isKeyboardOpen: isOpen }),
}));