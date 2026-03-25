"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkView } from "@/types/work";
import DeleteButton from "./DeleteButton";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  initialWorks: WorkView[];
};

/* =========================
   Sortable Item
========================= */
function SortableItem({ work }: { work: WorkView }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: work.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group rounded-xl border border-slate-700 bg-slate-900/60 p-5 flex items-center justify-between hover:border-teal-400/50 transition cursor-grab"
    >
      {/* Left */}
      <div className="flex flex-col">
        <span className="text-base font-medium text-slate-100">
          {work.title}
        </span>
        <span className="text-xs text-slate-400 mt-1">ID: {work.id}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/works/${work.id}`}
          className="text-sm text-teal-400 hover:text-teal-300 transition"
        >
          編集
        </Link>

        <DeleteButton workId={work.id} />
      </div>
    </li>
  );
}

/* =========================
   Main Component
========================= */
export default function AdminWorksClient({ initialWorks }: Props) {
  const [works, setWorks] = useState(initialWorks);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = works.findIndex((w) => w.id === active.id);
    const newIndex = works.findIndex((w) => w.id === over.id);

    const newList = arrayMove(works, oldIndex, newIndex);
    setWorks(newList);

    // 並び順保存
    try {
      await fetch("/api/works/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newList),
      });
    } catch (e) {
      console.error("Failed to save order");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Works 管理</h1>
          <p className="text-sm text-slate-400 mt-1">
            登録済みの制作実績を管理します
          </p>
        </div>

        <Link
          href="/admin/works/new"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-teal-400 transition"
        >
          ＋ 新規追加
        </Link>
      </div>

      {/* Drag & Drop */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={works.map((w) => w.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-4">
            {works.map((work) => (
              <SortableItem key={work.id} work={work} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {/* Empty */}
      {works.length === 0 && (
        <div className="mt-16 text-center text-slate-400">
          登録されている Works はありません
        </div>
      )}
    </div>
  );
}
