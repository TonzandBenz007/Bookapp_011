import TodoApp from "@/components/todo-app";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";

export default async function Home() {
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load todos: ${error.message}`);
  }

  return <TodoApp initialTodos={(todos as Todo[]) ?? []} />;
}
