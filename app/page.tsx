import AppHeader from "@/components/app-header";
import AddTodoForm from "@/components/add-todo-form";
import TodoList from "@/components/todo-list";

export default function Home() {
  const todos = [
    { task: "ซื้อของเข้าบ้าน", isComplete: false },
    { task: "ส่งการบ้านวิชา Web Programming", isComplete: true },
    { task: "ออกกำลังกาย 30 นาที", isComplete: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4">
        <div className="outline-2 outline-dashed outline-blue-400 rounded-xl p-2">
          <AppHeader />
        </div>

        <div className="outline-2 outline-dashed outline-green-400 rounded-xl p-2">
          <AddTodoForm />
        </div>

        <div className="outline-2 outline-dashed outline-purple-400 rounded-xl p-2">
          <TodoList todos={todos} />
        </div>
      </main>
    </div>
  );
}
