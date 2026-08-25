import type { Todo } from "@/types/todo";

export const mockTodos: Todo[] = [
  {
    id: "1",
    task: "ซื้อของเข้าบ้าน",
    year: 2026,
    is_complete: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    task: "ส่งการบ้านวิชา Web Programming",
    year: 2026,
    is_complete: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    task: "ออกกำลังกาย 30 นาที",
    year: 2026,
    is_complete: false,
    created_at: new Date().toISOString(),
  },
];
