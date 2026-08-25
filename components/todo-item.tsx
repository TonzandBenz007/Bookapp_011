"use client";

import { useState } from "react";
import type { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTask: string, newYear?: number | null) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onRename }: TodoItemProps) {
  // isEditing/draftText อยู่ที่นี่ ไม่ใช่ page.tsx เพราะเป็น UI state ชั่วคราวของแถวนี้แถวเดียว
  // (ไม่มีผลต่อข้อมูล todos จริงจนกว่าจะ save) ต่างจาก is_complete/task ที่เป็นข้อมูลจริงที่ทุก
  // component ต้องเห็นตรงกัน จึงต้องอยู่ parent เดียว
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.task);
  const [draftYear, setDraftYear] = useState(
    todo.year !== undefined && todo.year !== null ? String(todo.year) : ""
  );

  function saveEdit() {
    const trimmedText = draftText.trim();
    const parsedYear = draftYear.trim() !== "" ? parseInt(draftYear.trim(), 10) : null;
    const currentYear = todo.year !== undefined && todo.year !== null ? Number(todo.year) : null;

    if (
      trimmedText !== "" &&
      (trimmedText !== todo.task || parsedYear !== currentYear)
    ) {
      onRename(todo.id, trimmedText, parsedYear);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setDraftText(todo.task);
    setDraftYear(todo.year !== undefined && todo.year !== null ? String(todo.year) : "");
    setIsEditing(false);
  }

  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            todo.is_complete ? "border-green-500 bg-green-500" : "border-gray-300 bg-white"
          }`}
        >
          {todo.is_complete && (
            <svg
              className="h-3.5 w-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        {isEditing ? (
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <input
              type="text"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") handleCancel();
              }}
              className="flex-1 min-w-[140px] rounded-lg border border-gray-200 px-2 py-1 text-gray-700 outline-none focus:border-blue-500"
            />
            <input
              type="number"
              value={draftYear}
              onChange={(e) => setDraftYear(e.target.value)}
              placeholder="ปี"
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") handleCancel();
              }}
              className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-gray-700 outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={saveEdit}
              className="rounded-md bg-blue-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-600"
            >
              บันทึก
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
            >
              ยกเลิก
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span
              onDoubleClick={() => setIsEditing(true)}
              className={`cursor-pointer ${
                todo.is_complete ? "text-gray-400 line-through" : "text-gray-700"
              }`}
              title="ดับเบิ้ลคลิกเพื่อแก้ไข"
            >
              {todo.task}
            </span>
            {todo.year !== undefined && todo.year !== null && (
              <span className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                ปี {todo.year}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            todo.is_complete ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
          }`}
        >
          {todo.is_complete ? "เสร็จ" : "ไม่เสร็จ"}
        </span>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="แก้ไขรายการ"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="ลบรายการ"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
