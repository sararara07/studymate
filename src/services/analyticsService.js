import { supabase } from "../lib/supabase";

export async function getAnalytics() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    todos,
    flashcards,
    diary,
    exams,
  ] = await Promise.all([
    supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id),

    supabase
      .from("flashcards")
      .select("*")
      .eq("user_id", user.id),

    supabase
      .from("diary_entries")
      .select("*")
      .eq("user_id", user.id),

    supabase
      .from("exams")
      .select("*")
      .eq("user_id", user.id),
  ]);

  return {
    totalTodos: todos.data?.length || 0,
    completedTodos:
      todos.data?.filter((t) => t.completed).length || 0,

    totalFlashcards: flashcards.data?.length || 0,

    totalDiary: diary.data?.length || 0,

    totalExams: exams.data?.length || 0,
  };
}