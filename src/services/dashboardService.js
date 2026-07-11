import { supabase } from "../lib/supabase";

export async function getDashboardStats() {
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
      .eq("user_id", user.id)
      .order("exam_date", { ascending: true })
      .limit(3),
  ]);

  return {
    totalTodos: todos.data?.length || 0,
    completedTodos:
      todos.data?.filter((todo) => todo.completed).length || 0,

    flashcards: flashcards.data?.length || 0,

    diary: diary.data?.length || 0,

    upcomingExams: exams.data || [],
  };
}