"use client";

import type { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
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
        <span className={todo.is_complete ? "text-gray-400 line-through" : "text-gray-700"}>
          {todo.task}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            todo.is_complete ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
          }`}
        >
          {todo.is_complete ? "เสร็จ" : "ไม่เสร็จ"}
        </span>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          <svg
            className="h-4 w-4 text-gray-400 hover:text-red-500"
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
