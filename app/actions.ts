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

  revalidatePath("/"); //ป็นฟังก์ชันจาก next/cache ที่บอก Next.js ว่า "cache ของหน้านี้ล้าสมัยแล้ว ครั้งหน้าที่มีคน request หน้านี้ ให้ไปดึงข้อมูลใหม่จริงๆ แทนที่จะเสิร์ฟ HTML เก่าที่แคชไว้"
  return data as Todo;
}

export async function toggleTodo(id: string, isComplete: boolean): Promise<Todo> {
  const { data, error } = await supabase
    .from("todos")
    .update({ is_complete: isComplete })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update todo: ${error.message}`);
  }

  revalidatePath("/");
  return data as Todo;
}

export async function renameTodo(id: string, task: string): Promise<Todo> {
  const trimmedTask = task.trim();
  if (trimmedTask === "") {
    throw new Error("Task is required");
  }

  const { data, error } = await supabase
    .from("todos")
    .update({ task: trimmedTask })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to rename todo: ${error.message}`);
  }

  revalidatePath("/");
  return data as Todo;
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete todo: ${error.message}`);
  }

  revalidatePath("/");
}
