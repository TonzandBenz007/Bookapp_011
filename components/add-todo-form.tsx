"use client";

import { useState } from "react";

type AddTodoFormProps = {
  onAdd: (task: string, year?: number | null) => void;
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [task, setTask] = useState("");
  const [year, setYear] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (task.trim() === "") return;
    const parsedYear = year.trim() !== "" ? parseInt(year.trim(), 10) : null;
    onAdd(task, parsedYear);
    setTask("");
    setYear("");
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="เพิ่มรายการใหม่..."
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="ปี (เช่น 2026)"
          className="w-full sm:w-32 rounded-lg border border-gray-200 px-3 py-2 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-5 py-2 font-medium text-white hover:bg-blue-600 transition-colors"
        >
          เพิ่ม
        </button>
      </form>
      <p className="mt-2 text-sm text-gray-400">กด Enter เพื่อเพิ่มรายการอย่างรวดเร็ว</p>
    </div>
  );
}
