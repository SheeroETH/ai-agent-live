import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://wrepbclwfieogypfmvvk.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZXBiY2x3Zmllb2d5cGZtdnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDAwMjYsImV4cCI6MjA2NDQxNjAyNn0.01hYIMARZ3xh86J7PrbQj8nHqTymQ5xflarnHmkjCxg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export const createServerSupabaseClient = async () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}
