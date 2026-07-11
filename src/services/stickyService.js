import { supabase } from "../lib/supabase";

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getNotes() {
  const user = await getUser();

  const { data, error } = await supabase
    .from("sticky_notes")
    .select("*")
    .eq("user_id", user.id)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addNote(title, content, color) {
  const user = await getUser();

  const { error } = await supabase.from("sticky_notes").insert([
    {
      title,
      content,
      color,
      pinned: false,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}

export async function deleteNote(id) {
  const { error } = await supabase
    .from("sticky_notes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function togglePin(id, pinned) {
  const { error } = await supabase
    .from("sticky_notes")
    .update({
      pinned: !pinned,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function updateNote(id, title, content, color) {
  const { error } = await supabase
    .from("sticky_notes")
    .update({
      title,
      content,
      color,
    })
    .eq("id", id);

  if (error) throw error;
}