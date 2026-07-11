import { supabase } from "../lib/supabase";

// Register User
export async function registerUser({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) throw error;

  return data;
}

// Login User
export async function loginUser({ email, password }) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
}

// Logout
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

// Current Session
export async function getCurrentSession() {
  const { data, error } =
    await supabase.auth.getSession();

  if (error) throw error;

  return data.session;
}

// Current User
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
}