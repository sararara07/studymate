import { supabase } from "../lib/supabase";

export async function getQuizzes() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addQuiz(title, question, options, answer) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("quizzes").insert([
    {
      title,
      question,
      options,
      answer,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}

export async function deleteQuiz(id) {
  const { error } = await supabase
    .from("quizzes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}