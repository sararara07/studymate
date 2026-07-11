import { supabase } from "../lib/supabase";

export async function getExams() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("user_id", user.id)
    .order("exam_date", { ascending: true });

  if (error) throw error;

  return data;
}

export async function addExam(subject, examName, examDate) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("exams").insert([
    {
      subject,
      exam_name: examName,
      exam_date: examDate,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}

export async function deleteExam(id) {
  const { error } = await supabase
    .from("exams")
    .delete()
    .eq("id", id);

  if (error) throw error;
}