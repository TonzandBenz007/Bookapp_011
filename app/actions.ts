"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";

export async function addTodo(task: string, year?: number | null): Promise<Todo> {
  const trimmedTask = task.trim();
  if (trimmedTask === "") {
    throw new Error("Task is required");
  }

  const insertData: { task: string; year?: number | null } = { task: trimmedTask };
  if (year !== undefined && year !== null && !isNaN(year)) {
    insertData.year = year;
  }

  let { data, error } = await supabase
    .from("todos")
    .insert(insertData)
    .select()
    .single();

  // หากยังไม่ได้เพิ่มคอลัมน์ year ใน Supabase ให้ fallback บันทึกเฉพาะ task
  if (error && error.message.includes("'year'")) {
    const fallback = await supabase
      .from("todos")
      .insert({ task: trimmedTask })
      .select()
      .single();
    data = fallback.data;
    error = fallback.error;
  }

  if (error) {
    throw new Error(`Failed to add todo: ${error.message}`);
  }

  revalidatePath("/");
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

export async function renameTodo(id: string, task: string, year?: number | null): Promise<Todo> {
  const trimmedTask = task.trim();
  if (trimmedTask === "") {
    throw new Error("Task is required");
  }

  const updateData: { task: string; year?: number | null } = { task: trimmedTask };
  if (year !== undefined) {
    updateData.year = year !== null && !isNaN(year) ? year : null;
  }

  let { data, error } = await supabase
    .from("todos")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  // หากยังไม่ได้เพิ่มคอลัมน์ year ใน Supabase ให้ fallback แก้ไขเฉพาะ task
  if (error && error.message.includes("'year'")) {
    const fallback = await supabase
      .from("todos")
      .update({ task: trimmedTask })
      .eq("id", id)
      .select()
      .single();
    data = fallback.data;
    error = fallback.error;
  }

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
