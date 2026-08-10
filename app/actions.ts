"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";

export async function addTodo(task: string): Promise<Todo> {
  const trimmedTask = task.trim();
  if (trimmedTask === "") {
    throw new Error("Task is required");
  }

  const { data, error } = await supabase
    .from("todos")
    .insert({ task: trimmedTask })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add todo: ${error.message}`);
  }

  revalidatePath("/");
  return data as Todo;
}
