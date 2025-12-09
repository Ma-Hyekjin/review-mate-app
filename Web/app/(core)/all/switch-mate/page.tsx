// app/(user)/mypage/switch-mate/page.tsx
"use client";

import { useState } from "react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { FaPlus, FaPencilAlt, FaEdit, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Mate } from '@/types/mate';
import { ROUTES } from '@/constants';

// TODO: [DB] 이 초기 데이터는 실제로는 DB에서 사용자의 메이트 목록을 '불러와야(fetch)' 합니다.
const initialMates: Mate[] = [
  { id: 1, name: "메이트", persona: "20대 남성, ENFP" },
  { id: 2, name: "친절한 리뷰어", persona: "30대 여성, ISFJ" },
];

// 각 메이트 아이템 컴포넌트
function MateItem({ mate, onRename, onEditDetail }: { mate: Mate, onRename: (id: number, newName: string) => void, onEditDetail: (id: number) => void }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(mate.name);
  const isDefault = mate.isDefault || false;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: mate.id, disabled: isDefault }); // 기본 메이트는 드래그 불가
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  const handleRename = () => {
    if (isDefault) return; // 기본 메이트는 이름 변경 불가
    onRename(mate.id, tempName);
    setIsEditingName(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 rounded-lg border bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <div {...attributes} {...listeners} className={`p-2 ${isDefault ? 'cursor-not-allowed text-gray-300' : 'cursor-grab text-gray-400'}`}><FaBars /></div>
      <div className="flex-grow">
        {isEditingName && !isDefault ? (
          <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} onBlur={handleRename} onKeyDown={(e) => e.key === 'Enter' && handleRename()} className="w-full rounded bg-gray-100 p-1 dark:bg-gray-700" autoFocus />
        ) : (
          <div className="flex items-center gap-2">
            <p className="font-semibold">{mate.name}</p>
            {isDefault && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                [기본]
              </span>
            )}
          </div>
        )}
        <p className="text-sm text-gray-500">{mate.persona}</p>
      </div>
      {!isDefault && (
        <>
          <button onClick={() => setIsEditingName(true)} className="p-2 text-gray-400 hover:text-black dark:hover:text-white"><FaPencilAlt /></button>
          <button onClick={() => onEditDetail(mate.id)} className="p-2 text-gray-400 hover:text-black dark:hover:text-white"><FaEdit /></button>
        </>
      )}
    </div>
  );
}

// 메인 페이지 컴포넌트
export default function SwitchMatePage() {
  const router = useRouter();
  const [mates, setMates] = useState(initialMates);
  const MAX_MATES = 5;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeMate = mates.find(m => m.id === active.id);
      // 기본 메이트는 드래그 불가
      if (activeMate?.isDefault) return;
      
      setMates((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        // TODO: [DB] 여기서 newOrder 배열을 서버로 보내 순서 변경사항을 DB에 '업데이트(update)'해야 합니다.
        // logInfo("순서 변경됨", { newOrder }); // 필요시 활성화
        return newOrder;
      });
    }
  };

  const handleRename = (id: number, newName: string) => {
    const mate = mates.find(m => m.id === id);
    // 기본 메이트는 이름 변경 불가
    if (mate?.isDefault) return;
    
    // TODO: [DB] 여기서 id와 newName을 서버로 보내 DB의 메이트 이름을 '업데이트(update)'해야 합니다.
    // logInfo(`메이트 ${id}의 이름 변경`, { id, newName }); // 필요시 활성화
    setMates(mates.map(m => m.id === id ? { ...m, name: newName } : m));
  };
  
  const handleEditDetail = (id: number) => {
    router.push(ROUTES.ALL_MATE_DETAIL(id.toString()));
  };

  return (
    <div>
      <SubPageHeader title="메이트 전환" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">생성된 페르소나: {mates.length}/{MAX_MATES}</p>
            <button onClick={() => router.push(ROUTES.QUICK_PICK)} className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">
              <FaPlus size={12} /><span>새로 만들기</span>
            </button>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={mates} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {mates.map(mate => (
                  <MateItem key={mate.id} mate={mate} onRename={handleRename} onEditDetail={handleEditDetail} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </main>
    </div>
  );
}