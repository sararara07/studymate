import { supabase } from "../lib/supabase";

export async function getTodos() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addTodo(title) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("todos").insert([
    {
      title,
      completed: false,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}

export async function toggleTodo(id, completed) {
  const { error } = await supabase
    .from("todos")
    .update({
      completed: !completed,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteTodo(id) {
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) throw error;
}