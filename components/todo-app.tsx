"use client";

import { useState } from "react";
import AppHeader from "@/components/app-header";
import AddTodoForm from "@/components/add-todo-form";
import TodoList from "@/components/todo-list";
import { addTodo, toggleTodo, renameTodo, deleteTodo } from "@/app/actions";
import type { Todo } from "@/types/todo";

type TodoAppProps = {
  initialTodos: Todo[];
};

export default function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  async function handleToggle(id: string) {
    const current = todos.find((todo) => todo.id === id);
    if (!current) return;

    const updated = await toggleTodo(id, !current.is_complete);
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  async function handleAdd(task: string, year?: number | null) {
    const newTodo = await addTodo(task, year);
    setTodos((prev) => [newTodo, ...prev]);
  }

  async function handleRename(id: string, newTask: string, newYear?: number | null) {
    const updated = await renameTodo(id, newTask, newYear);
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4">
        <AppHeader />
        <AddTodoForm onAdd={handleAdd} />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onRename={handleRename}
        />
      </main>
    </div>
  );
}
