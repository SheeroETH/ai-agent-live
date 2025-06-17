import { createClient } from "@supabase/supabase-js"

// Use your actual Supabase credentials
const supabaseUrl = "https://ctuhxtctberkwpmesura.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dWh4dGN0YmVya3dwbWVzdXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0OTAwMjQsImV4cCI6MjA2NDA2NjAyNH0.ZtUxYZPf6V23Lh1be2T6WxIMGj2wyvYHJpw0n9EdnYU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your Tweezy Email table
export interface EmailEntry {
  id: number
  email: string
  created_at: string
}
