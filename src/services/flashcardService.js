import { supabase } from "../lib/supabase";

export async function getFlashcards() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addFlashcard(deckName, question, answer) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("flashcards").insert([
    {
      deck_name: deckName,
      question,
      answer,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}

export async function deleteFlashcard(id) {
  const { error } = await supabase
    .from("flashcards")
    .delete()
    .eq("id", id);

  if (error) throw error;
}