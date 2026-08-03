import type { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span
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
        </span>
        <span className={todo.is_complete ? "text-gray-400 line-through" : "text-gray-700"}>
          {todo.task}
        </span>
      </div>
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
          todo.is_complete ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
        }`}
      >
        {todo.is_complete ? "เสร็จ" : "ไม่เสร็จ"}
      </span>
    </div>
  );
}
