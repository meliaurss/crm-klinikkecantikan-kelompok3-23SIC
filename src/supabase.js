import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dvtyxlepuyiokidnbpyk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dHl4bGVwdXlpb2tpZG5icHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NjQ2ODcsImV4cCI6MjA5MDM0MDY4N30.wxJZHR6C1hsXu6eeFsTkdRCOyOvNak6yU2gbpuqpdsk'
export const supabase = createClient(supabaseUrl, supabaseKey)