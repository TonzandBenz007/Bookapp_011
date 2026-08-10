"use client";

import { useState } from "react";
import AppHeader from "@/components/app-header";
import AddTodoForm from "@/components/add-todo-form";
import TodoList from "@/components/todo-list";
import type { Todo } from "@/types/todo";

type TodoAppProps = {
  initialTodos: Todo[];
};

export default function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, is_complete: !todo.is_complete } : todo
      )
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleAdd(task: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      task,
      is_complete: false,
      created_at: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function handleRename(id: string, newTask: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
    );
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
