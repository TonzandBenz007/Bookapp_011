import AppHeader from "@/components/app-header";
import AddTodoForm from "@/components/add-todo-form";
import TodoList from "@/components/todo-list";
import { mockTodos } from "@/lib/mock-todos";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4">
        <AppHeader />
        <AddTodoForm />
        <TodoList todos={mockTodos} />
      </main>
    </div>
  );
}
