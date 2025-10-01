// app/(user)/mypage/switch-mate/page.tsx
"use client";

import { useState } from "react";
import SubPageHeader from "@/components/SubPageHeader";
import { FaPlus, FaPencilAlt, FaEdit, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 타입 정의
interface Mate { id: number; name: string; persona: string; }

// TODO: [DB] 이 초기 데이터는 실제로는 DB에서 사용자의 메이트 목록을 '불러와야(fetch)' 합니다.
const initialMates: Mate[] = [
  { id: 1, name: "메이트", persona: "20대 남성, ENFP" },
  { id: 2, name: "친절한 리뷰어", persona: "30대 여성, ISFJ" },
];

// 각 메이트 아이템 컴포넌트
function MateItem({ mate, onRename, onEditDetail }: { mate: Mate, onRename: (id: number, newName: string) => void, onEditDetail: (id: number) => void }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(mate.name);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: mate.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  const handleRename = () => {
    onRename(mate.id, tempName);
    setIsEditingName(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 rounded-lg border bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <div {...attributes} {...listeners} className="cursor-grab p-2 text-gray-400"><FaBars /></div>
      <div className="flex-grow">
        {isEditingName ? (
          <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} onBlur={handleRename} onKeyDown={(e) => e.key === 'Enter' && handleRename()} className="w-full rounded bg-gray-100 p-1 dark:bg-gray-700" autoFocus />
        ) : (
          <p className="font-semibold">{mate.name}</p>
        )}
        <p className="text-sm text-gray-500">{mate.persona}</p>
      </div>
      <button onClick={() => setIsEditingName(true)} className="p-2 text-gray-400 hover:text-black dark:hover:text-white"><FaPencilAlt /></button>
      <button onClick={() => onEditDetail(mate.id)} className="p-2 text-gray-400 hover:text-black dark:hover:text-white"><FaEdit /></button>
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
      setMates((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        // TODO: [DB] 여기서 newOrder 배열을 서버로 보내 순서 변경사항을 DB에 '업데이트(update)'해야 합니다.
        console.log("순서 변경됨:", newOrder);
        return newOrder;
      });
    }
  };

  const handleRename = (id: number, newName: string) => {
    // TODO: [DB] 여기서 id와 newName을 서버로 보내 DB의 메이트 이름을 '업데이트(update)'해야 합니다.
    console.log(`메이트 ${id}의 이름을 ${newName}(으)로 변경`);
    setMates(mates.map(m => m.id === id ? { ...m, name: newName } : m));
  };
  
  const handleEditDetail = (id: number) => {
    router.push(`/mypage/switch-mate/${id}`);
  };

  return (
    <div>
      <SubPageHeader title="메이트 전환" />
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">생성된 페르소나: {mates.length}/{MAX_MATES}</p>
            <button onClick={() => router.push('/quick-pick')} className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">
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