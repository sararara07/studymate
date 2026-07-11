import { supabase } from "../lib/supabase";

export async function getDiaryEntries() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("diary_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addDiaryEntry(title, content) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("diary_entries").insert([
    {
      title,
      content,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}

export async function deleteDiaryEntry(id) {
  const { error } = await supabase
    .from("diary_entries")
    .delete()
    .eq("id", id);

  if (error) throw error;
}