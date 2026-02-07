import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fiwjdozedgbhnfpgfudv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpd2pkb3plZGdiaG5mcGdmdWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNTgwNTIsImV4cCI6MjA4NTczNDA1Mn0.qv2kXolbBGugUMbaTUJiCh_WGDnEynBCgEvHTDUBJB8'

export const supabase = createClient(supabaseUrl, supabaseKey)
